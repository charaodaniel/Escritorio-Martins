"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useRef } from "react";
import type { ContentData } from "@/lib/content-loader";
import type { User } from "@/lib/users-loader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlusCircle, Trash2, Upload, Instagram, Image as ImageIcon, Users, UserPlus, LogOut, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import RichTextEditor from "@/components/rich-text-editor";
import { useRouter } from "next/navigation";

const heroSchema = z.object({
  title: z.string().min(1, "Título é obrigatório."),
  subtitle: z.string().min(1, "Subtítulo é obrigatório."),
});

const practiceAreaSchema = z.object({
  title: z.string().min(1, "Título da área é obrigatório."),
  description: z.string().min(1, "Descrição da área é obrigatória."),
});

const whyUsFeatureSchema = z.object({
  title: z.string().min(1, "Título do diferencial é obrigatório."),
  description: z.string().min(1, "Descrição do diferencial é obrigatória."),
});

const attorneyMemberSchema = z.object({
  id: z.string().min(1, "ID é obrigatório."),
  name: z.string().min(1, "Nome é obrigatório."),
  title: z.string().min(1, "Cargo é obrigatório."),
  bio: z.string().min(1, "Bio é obrigatória."),
  imageUrl: z.string().min(1, "URL da imagem é obrigatória."),
  bioFormat: z.enum(['default', 'justify', 'pre-line']).default('default'),
});

const postSchema = z.object({
  postUrl: z.string().url("Por favor, insira um URL do Instagram válido."),
});

const socialFeedSchema = z.object({
    enabled: z.boolean(),
    posts: z.array(postSchema),
});

const contactInfoSchema = z.object({
  address: z.string().min(1, "Endereço é obrigatório."),
  email: z.string().email("E-mail inválido."),
  whatsapp: z.string().min(1, "Número do WhatsApp é obrigatório (apenas números)."),
  whatsappLink: z.string().url("Link do WhatsApp inválido."),
  phone: z.string().min(1, "Telefone para exibição é obrigatório."),
  openingHours: z.string().min(1, "Horário de funcionamento é obrigatório."),
  facebookUrl: z.string().url("URL do Facebook inválida."),
  instagramUrl: z.string().url("URL do Instagram inválida."),
});

const formSchema = z.object({
  hero: heroSchema,
  practiceAreas: z.object({
    enabled: z.boolean(),
    title: z.string().min(1, "Título da seção é obrigatório."),
    subtitle: z.string().min(1, "Subtítulo da seção é obrigatório."),
    areas: z.array(practiceAreaSchema),
  }),
  whyUs: z.object({
    enabled: z.boolean(),
    title: z.string().min(1, "Título da seção é obrigatório."),
    subtitle: z.string().min(1, "Subtítulo da seção é obrigatório."),
    features: z.array(whyUsFeatureSchema),
  }),
  ourHistory: z.object({
    enabled: z.boolean(),
    title: z.string().min(1, "Título da história é obrigatório."),
    content: z.string().min(1, "O conteúdo da história é obrigatório."),
  }),
  attorneys: z.object({
    enabled: z.boolean(),
    title: z.string().min(1, "Título da seção é obrigatório."),
    subtitle: z.string().min(1, "Subtítulo da seção é obrigatório."),
    members: z.array(attorneyMemberSchema),
  }),
  testimonials: z.object({
      enabled: z.boolean(),
      title: z.string().min(1, "Título da seção é obrigatório."),
      subtitle: z.string().min(1, "Subtítulo da seção é obrigatório."),
      instagram: socialFeedSchema,
  }),
  contact: z.object({
    enabled: z.boolean(),
  }),
  contactInfo: contactInfoSchema,
});

const newUserSchema = z.object({
  username: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export default function AdminPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState<number | null>(null);
  const [initialData, setInitialData] = useState<ContentData | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || undefined,
  });

  const newUserForm = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
        username: "",
        password: "",
    },
  });

  const { fields: attorneyFields, append: appendAttorney, remove: removeAttorney } = useFieldArray({
    control: form.control,
    name: "attorneys.members",
  });

  const { fields: instagramPostFields, append: appendInstagramPost, remove: removeInstagramPost } = useFieldArray({
    control: form.control,
    name: "testimonials.instagram.posts",
  });

  async function fetchUsers() {
    try {
      const response = await fetch('/api/get-users');
      if (!response.ok) throw new Error('Falha ao carregar usuários.');
      const userList = await response.json();
      setUsers(userList);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  async function fetchContent() {
      try {
        const response = await fetch('/api/get-content');
        if (!response.ok) throw new Error('Falha ao carregar conteúdo.');
        const content = await response.json();
        setInitialData(content);
        form.reset(content);
      } catch (error) {
        console.error("Erro ao buscar conteúdo:", error);
        toast({
          variant: "destructive",
          title: "Erro ao Carregar Painel",
          description: "Não foi possível carregar os dados para edição.",
        });
      }
  }

  useEffect(() => {
    fetchContent();
    fetchUsers();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values, null, 2),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao salvar o conteúdo.");
      }
      
      toast({
        title: "Conteúdo Salvo com Sucesso!",
        description: "As alterações foram enviadas e o site será atualizado em breve.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao Salvar",
        description: error.message || "Não foi possível salvar as alterações.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(index);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Falha no upload da imagem.');

      const { filePath } = await response.json();
      form.setValue(`attorneys.members.${index}.imageUrl`, filePath);
      toast({ title: 'Upload Concluído', description: `Imagem carregada com sucesso.` });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro no Upload',
        description: error.message || 'Não foi possível carregar a imagem.',
      });
    } finally {
      setIsUploading(null);
      if (event.target) event.target.value = '';
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth-required', {
        headers: { 'Authorization': 'Basic ' + btoa('logout:logout') }
      });
      router.push('/');
    } catch (error) {
      router.push('/');
    }
  };

  const SectionToggle = ({ name }: { name: any }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-3 space-y-0">
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isSubmitting}
            />
          </FormControl>
          <FormLabel className="font-normal text-sm !mt-0">
            {field.value ? 'Visível' : 'Oculto'}
          </FormLabel>
        </FormItem>
      )}
    />
  );

  if (!initialData) {
    return <div className="flex justify-center items-center h-screen">Carregando painel...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold font-headline text-primary">Painel de Edição</h1>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
            </Button>
        </div>
        <p className="text-muted-foreground mb-8">Gerencie o conteúdo do seu site aqui.</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              
              {/* Hero */}
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-headline text-primary">Seção Principal (Hero)</AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <FormField
                    control={form.control}
                    name="hero.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título Principal</FormLabel>
                        <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hero.subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtítulo</FormLabel>
                        <FormControl><RichTextEditor value={field.value} onChange={field.onChange} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Áreas de Atuação */}
              <AccordionItem value="item-2">
                <div className="flex w-full items-center justify-between">
                  <AccordionTrigger className="text-xl font-headline text-primary flex-1 hover:no-underline text-left">Áreas de Atuação</AccordionTrigger>
                  <div className="py-4 pr-4 pl-2">
                    <SectionToggle name="practiceAreas.enabled" />
                  </div>
                </div>
                <AccordionContent className="space-y-6 pt-4">
                  <FormField
                    control={form.control}
                    name="practiceAreas.title"
                    render={({ field }) => (
                      <FormItem><FormLabel>Título da Seção</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="practiceAreas.subtitle"
                    render={({ field }) => (
                      <FormItem><FormLabel>Subtítulo da Seção</FormLabel><FormControl><RichTextEditor value={field.value} onChange={field.onChange} /></FormControl></FormItem>
                    )}
                  />
                  <div className="space-y-4 pt-4">
                    {form.getValues().practiceAreas.areas.map((_, index) => (
                      <div key={index} className="p-4 border rounded-md space-y-4 bg-background/50">
                        <FormField
                          control={form.control}
                          name={`practiceAreas.areas.${index}.title`}
                          render={({ field }) => (
                            <FormItem><FormLabel>Título da Área {index + 1}</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`practiceAreas.areas.${index}.description`}
                          render={({ field }) => (
                            <FormItem><FormLabel>Descrição</FormLabel><FormControl><RichTextEditor value={field.value} onChange={field.onChange} /></FormControl></FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Diferenciais */}
              <AccordionItem value="item-3">
                <div className="flex w-full items-center justify-between">
                  <AccordionTrigger className="text-xl font-headline text-primary flex-1 hover:no-underline text-left">Diferenciais</AccordionTrigger>
                  <div className="py-4 pr-4 pl-2">
                    <SectionToggle name="whyUs.enabled" />
                  </div>
                </div>
                <AccordionContent className="space-y-6 pt-4">
                  <FormField
                    control={form.control}
                    name="whyUs.title"
                    render={({ field }) => (
                      <FormItem><FormLabel>Título da Seção</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whyUs.subtitle"
                    render={({ field }) => (
                      <FormItem><FormLabel>Subtítulo da Seção</FormLabel><FormControl><RichTextEditor value={field.value} onChange={field.onChange} /></FormControl></FormItem>
                    )}
                  />
                  <div className="space-y-4 pt-4">
                    {form.getValues().whyUs.features.map((_, index) => (
                      <div key={index} className="p-4 border rounded-md space-y-4 bg-background/50">
                        <FormField
                          control={form.control}
                          name={`whyUs.features.${index}.title`}
                          render={({ field }) => (
                            <FormItem><FormLabel>Diferencial {index + 1}</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`whyUs.features.${index}.description`}
                          render={({ field }) => (
                            <FormItem><FormLabel>Descrição</FormLabel><FormControl><RichTextEditor value={field.value} onChange={field.onChange} /></FormControl></FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Nossa História */}
              <AccordionItem value="item-4">
                <div className="flex w-full items-center justify-between">
                  <AccordionTrigger className="text-xl font-headline text-primary flex-1 hover:no-underline text-left">Nossa História</AccordionTrigger>
                  <div className="py-4 pr-4 pl-2">
                    <SectionToggle name="ourHistory.enabled" />
                  </div>
                </div>
                <AccordionContent className="space-y-6 pt-4">
                  <FormField
                    control={form.control}
                    name="ourHistory.title"
                    render={({ field }) => (
                      <FormItem><FormLabel>Título</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ourHistory.content"
                    render={({ field }) => (
                      <FormItem><FormLabel>Conteúdo</FormLabel><FormControl><RichTextEditor value={field.value} onChange={field.onChange} /></FormControl></FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Equipe */}
              <AccordionItem value="item-5">
                <div className="flex w-full items-center justify-between">
                  <AccordionTrigger className="text-xl font-headline text-primary flex-1 hover:no-underline text-left">Equipe</AccordionTrigger>
                  <div className="py-4 pr-4 pl-2">
                    <SectionToggle name="attorneys.enabled" />
                  </div>
                </div>
                <AccordionContent className="space-y-6 pt-4">
                  <FormField
                    control={form.control}
                    name="attorneys.title"
                    render={({ field }) => (
                      <FormItem><FormLabel>Título da Seção</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attorneys.subtitle"
                    render={({ field }) => (
                      <FormItem><FormLabel>Subtítulo</FormLabel><FormControl><RichTextEditor value={field.value} onChange={field.onChange} /></FormControl></FormItem>
                    )}
                  />
                  <div className="space-y-6 pt-4">
                    {attorneyFields.map((item, index) => (
                      <div key={item.id} className="p-4 border rounded-md space-y-4 bg-background relative shadow-sm">
                        <Button type="button" variant="destructive" size="icon" className="absolute top-4 right-4 h-7 w-7 z-10" onClick={() => removeAttorney(index)}><Trash2 className="h-4 w-4" /></Button>
                        <div className="flex flex-col sm:flex-row gap-6">
                          <div className="w-32 h-32 bg-muted rounded-lg overflow-hidden border flex-shrink-0">
                            {form.watch(`attorneys.members.${index}.imageUrl`) ? (
                              <Image src={form.watch(`attorneys.members.${index}.imageUrl`)} alt="Preview" width={128} height={128} className="object-cover h-full w-full" />
                            ) : (
                              <div className="flex items-center justify-center h-full"><ImageIcon className="w-10 h-10 text-muted-foreground" /></div>
                            )}
                          </div>
                          <div className="flex-1 space-y-4">
                            <FormField control={form.control} name={`attorneys.members.${index}.name`} render={({ field }) => (
                              <FormItem><FormLabel>Nome</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                            )} />
                            <FormField control={form.control} name={`attorneys.members.${index}.title`} render={({ field }) => (
                              <FormItem><FormLabel>Cargo/Título</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                            )} />
                          </div>
                        </div>
                        <FormField control={form.control} name={`attorneys.members.${index}.bio`} render={({ field }) => (
                          <FormItem><FormLabel>Bio/Perfil</FormLabel><FormControl><RichTextEditor value={field.value} onChange={field.onChange} /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name={`attorneys.members.${index}.imageUrl`} render={({ field }) => (
                          <FormItem>
                            <FormLabel>Foto do Advogado</FormLabel>
                            <div className="flex gap-2">
                              <FormControl><Input {...field} placeholder="URL da imagem ou upload ->" /></FormControl>
                              <Button type="button" variant="outline" size="icon" onClick={() => fileInputRefs.current[index]?.click()} disabled={isUploading === index}>
                                <Upload className={isUploading === index ? "animate-spin" : "h-4 w-4"} />
                              </Button>
                              <input type="file" ref={(el) => (fileInputRefs.current[index] = el)} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, index)} />
                            </div>
                          </FormItem>
                        )} />
                      </div>
                    ))}
                    <Button type="button" variant="outline" className="w-full" onClick={() => appendAttorney({ id: `new-${Date.now()}`, name: "", title: "", bio: "", imageUrl: "", bioFormat: "default" })}><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Advogado</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Publicações (Instagram) */}
              <AccordionItem value="item-6">
                <div className="flex w-full items-center justify-between">
                  <AccordionTrigger className="text-xl font-headline text-primary flex-1 hover:no-underline text-left">Publicações (Instagram)</AccordionTrigger>
                  <div className="py-4 pr-4 pl-2">
                    <SectionToggle name="testimonials.enabled" />
                  </div>
                </div>
                <AccordionContent className="space-y-6 pt-4">
                  <FormField control={form.control} name="testimonials.title" render={({ field }) => (
                    <FormItem><FormLabel>Título</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name="testimonials.subtitle" render={({ field }) => (
                    <FormItem><FormLabel>Subtítulo</FormLabel><FormControl><RichTextEditor value={field.value} onChange={field.onChange} /></FormControl></FormItem>
                  )} />
                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between items-center mb-2 px-2">
                      <h3 className="font-semibold flex items-center gap-2"><Instagram className="h-5 w-5" /> Feed do Instagram</h3>
                      <SectionToggle name="testimonials.instagram.enabled" />
                    </div>
                    {instagramPostFields.map((item, index) => (
                      <div key={item.id} className="relative p-4 border rounded-md bg-muted/30">
                        <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeInstagramPost(index)}><Trash2 className="h-3 w-3" /></Button>
                        <FormField control={form.control} name={`testimonials.instagram.posts.${index}.postUrl`} render={({ field }) => (
                          <FormItem><FormLabel className="text-xs">Link do Post/Reel</FormLabel><FormControl><Input {...field} placeholder="https://www.instagram.com/p/..." /></FormControl></FormItem>
                        )} />
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => appendInstagramPost({ postUrl: "" })}><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Post</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Informações de Contato */}
              <AccordionItem value="item-7">
                <div className="flex w-full items-center justify-between">
                  <AccordionTrigger className="text-xl font-headline text-primary flex-1 hover:no-underline text-left">Informações de Contato</AccordionTrigger>
                  <div className="py-4 pr-4 pl-2">
                    <SectionToggle name="contact.enabled" />
                  </div>
                </div>
                <AccordionContent className="space-y-6 pt-4">
                  <FormField control={form.control} name="contactInfo.address" render={({ field }) => (
                    <FormItem><FormLabel>Endereço Físico</FormLabel><FormControl><RichTextEditor value={field.value} onChange={field.onChange} /></FormControl></FormItem>
                  )} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="contactInfo.email" render={({ field }) => (
                      <FormItem><FormLabel>E-mail</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="contactInfo.phone" render={({ field }) => (
                      <FormItem><FormLabel>Telefone (Exibição)</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="contactInfo.whatsapp" render={({ field }) => (
                      <FormItem><FormLabel>WhatsApp (Apenas Números)</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="contactInfo.whatsappLink" render={({ field }) => (
                      <FormItem><FormLabel>Link Direto WhatsApp</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="contactInfo.openingHours" render={({ field }) => (
                    <FormItem><FormLabel>Horário de Atendimento</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                  )} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="contactInfo.facebookUrl" render={({ field }) => (
                      <FormItem><FormLabel>Link Facebook</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="contactInfo.instagramUrl" render={({ field }) => (
                      <FormItem><FormLabel>Link Instagram</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                    )} />
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>

            <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg font-bold shadow-lg">
              {isSubmitting ? "Salvando Alterações..." : <><Save className="mr-2 h-6 w-6" /> Salvar Tudo e Atualizar Site</>}
            </Button>
          </form>
        </Form>

        {/* Gerenciamento de Usuários */}
        <div className="mt-20 pt-10 border-t space-y-8">
            <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-2"><Users className="h-6 w-6" /> Gerenciamento de Acesso</h2>
            <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h3 className="font-semibold mb-4">Administradores Ativos</h3>
                <div className="space-y-2">
                    {users.map(user => (
                        <div key={user.username} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                            <span className="font-medium">{user.username}</span>
                            {users.length > 1 && (
                                <Button variant="destructive" size="icon" className="h-8 w-8" onClick={async () => {
                                  if (confirm(`Tem certeza que deseja remover o acesso de ${user.username}?`)) {
                                    const all = await fetch('/api/get-all-users-for-update').then(r => r.json());
                                    const filtered = all.filter((u: any) => u.username !== user.username);
                                    await fetch('/api/save-users', { method: 'POST', body: JSON.stringify(filtered) });
                                    fetchUsers();
                                    toast({ title: "Usuário removido." });
                                  }
                                }}><Trash2 className="h-4 w-4" /></Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><UserPlus className="h-5 w-5" /> Adicionar Novo Acesso</h3>
                <Form {...newUserForm}>
                  <form onSubmit={newUserForm.handleSubmit(async (v) => {
                    const all = await fetch('/api/get-all-users-for-update').then(r => r.json());
                    if (all.find((u: any) => u.username === v.username)) {
                      newUserForm.setError('username', { message: 'Este usuário já existe.' });
                      return;
                    }
                    await fetch('/api/save-users', { method: 'POST', body: JSON.stringify([...all, v]) });
                    newUserForm.reset();
                    fetchUsers();
                    toast({ title: "Novo administrador criado com sucesso!" });
                  })} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <FormField control={newUserForm.control} name="username" render={({ field }) => (
                      <FormItem><FormLabel>Nome de Usuário</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={newUserForm.control} name="password" render={({ field }) => (
                      <FormItem><FormLabel>Senha</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit" variant="outline" className="sm:col-span-2"><PlusCircle className="mr-2 h-4 w-4" /> Criar Novo Administrador</Button>
                  </form>
                </Form>
            </div>
        </div>
      </div>
    </div>
  );
}
