"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
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
  imageUrl: z.string().refine(value => value.startsWith('/') || value.startsWith('http'), {
    message: "Deve ser um URL válido ou um caminho local (ex: /foto.jpg)."
  }),
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
      if (!response.ok) {
        throw new Error('Falha ao carregar usuários.');
      }
      const userList = await response.json();
      setUsers(userList);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  async function fetchContent() {
      try {
        const response = await fetch('/api/get-content');
        if (!response.ok) {
          throw new Error('Falha ao carregar conteúdo.');
        }
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

      if (!response.ok) {
        throw new Error('Falha no upload da imagem.');
      }

      const { filePath } = await response.json();
      form.setValue(`attorneys.members.${index}.imageUrl`, filePath);
      toast({
        title: 'Upload Concluído',
        description: `Imagem carregada com sucesso.`,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro no Upload',
        description: error.message || 'Não foi possível carregar a imagem.',
      });
    } finally {
      setIsUploading(null);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleSaveUsers = async (updatedUsers: User[]) => {
    setIsSubmitting(true);
    try {
        const response = await fetch("/api/save-users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUsers),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Falha ao salvar os usuários.");
        }

        toast({
            title: "Usuários Atualizados!",
            description: "A lista de usuários foi salva com sucesso.",
        });
        await fetchUsers();
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Erro ao Salvar Usuários",
            description: error.message || "Não foi possível salvar as alterações.",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleAddUser = async (values: z.infer<typeof newUserSchema>) => {
      try {
          const currentUsersResponse = await fetch('/api/get-users');
          if (!currentUsersResponse.ok) {
              toast({ variant: "destructive", title: "Erro", description: "Não foi possível verificar usuários existentes." });
              return;
          }
          const currentUsers = await currentUsersResponse.json();

          if (currentUsers.find((u: User) => u.username === values.username)) {
              newUserForm.setError("username", { message: "Este nome de usuário já existe." });
              return;
          }

          const getAllResponse = await fetch('/api/get-all-users-for-update');
          if (!getAllResponse.ok) {
              throw new Error("Falha ao obter lista completa de usuários.");
          }
          const allUsersResponse = await getAllResponse.json();
          const newUsers = [...allUsersResponse, values];
          await handleSaveUsers(newUsers);
          newUserForm.reset();
      } catch (error: any) {
          toast({
              variant: "destructive",
              title: "Erro ao Adicionar",
              description: error.message || "Não foi possível adicionar o usuário.",
          });
      }
  };

  const handleRemoveUser = async (usernameToRemove: string) => {
      try {
          const getAllResponse = await fetch('/api/get-all-users-for-update');
          if (!getAllResponse.ok) {
              throw new Error("Falha ao obter lista de usuários.");
          }
          const allUsersResponse = await getAllResponse.json();
          const updatedUsers = allUsersResponse.filter((u: User) => u.username !== usernameToRemove);
          await handleSaveUsers(updatedUsers);
      } catch (error: any) {
          toast({
              variant: "destructive",
              title: "Erro ao Remover",
              description: error.message || "Não foi possível remover o usuário.",
          });
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

  if (!initialData) {
    return <div className="flex justify-center items-center h-screen">Carregando painel...</div>;
  }
  
  const SectionToggle = ({ name, isSubmitting }: { name: any, isSubmitting: boolean }) => (
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
        
        {/* Provedor de Contexto do Formulário Principal */}
        <Form {...form}>
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full mb-10">
            
            {/* Seção Hero */}
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-headline text-primary">Seção Principal (Hero)</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    <Save className="mr-2 h-4 w-4" /> Salvar Seção Hero
                  </Button>
                </form>
              </AccordionContent>
            </AccordionItem>

            {/* Seção Áreas de Atuação */}
            <AccordionItem value="item-2">
               <div className="flex w-full items-center justify-between">
                  <AccordionTrigger className="text-xl font-headline text-primary flex-1 hover:no-underline">Áreas de Atuação</AccordionTrigger>
                  <div className="py-4 pr-4 pl-2">
                      <SectionToggle name="practiceAreas.enabled" isSubmitting={isSubmitting} />
                  </div>
               </div>
              <AccordionContent className="space-y-6 pt-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="practiceAreas.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Seção</FormLabel>
                        <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="practiceAreas.subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtítulo da Seção</FormLabel>
                        <FormControl><RichTextEditor value={field.value} onChange={field.onChange} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <h3 className="font-semibold mt-4">Áreas</h3>
                   {form.getValues().practiceAreas.areas.map((_, index) => (
                      <div key={index} className="p-4 border rounded-md space-y-4 bg-background">
                         <FormField
                            control={form.control}
                            name={`practiceAreas.areas.${index}.title`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título da Área {index + 1}</FormLabel>
                                <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`practiceAreas.areas.${index}.description`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição da Área {index + 1}</FormLabel>
                                <FormControl><RichTextEditor value={field.value} onChange={field.onChange} disabled={isSubmitting} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                      </div>
                   ))}
                   <Button type="submit" disabled={isSubmitting} className="w-full">
                    <Save className="mr-2 h-4 w-4" /> Salvar Áreas de Atuação
                  </Button>
                </form>
              </AccordionContent>
            </AccordionItem>

            {/* Seção Diferenciais */}
            <AccordionItem value="item-3">
               <div className="flex w-full items-center justify-between">
                  <AccordionTrigger className="text-xl font-headline text-primary flex-1 hover:no-underline">Diferenciais</AccordionTrigger>
                  <div className="py-4 pr-4 pl-2">
                    <SectionToggle name="whyUs.enabled" isSubmitting={isSubmitting} />
                  </div>
               </div>
               <AccordionContent className="space-y-6 pt-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="whyUs.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Seção</FormLabel>
                        <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="whyUs.subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtítulo da Seção</FormLabel>
                        <FormControl><RichTextEditor value={field.value} onChange={field.onChange} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <h3 className="font-semibold mt-4">Diferenciais</h3>
                   {form.getValues().whyUs.features.map((_, index) => (
                      <div key={index} className="p-4 border rounded-md space-y-4 bg-background">
                         <FormField
                            control={form.control}
                            name={`whyUs.features.${index}.title`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título do Diferencial {index + 1}</FormLabel>
                                <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`whyUs.features.${index}.description`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição do Diferencial {index + 1}</FormLabel>
                                <FormControl><RichTextEditor value={field.value} onChange={field.onChange} disabled={isSubmitting} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                      </div>
                   ))}
                   <Button type="submit" disabled={isSubmitting} className="w-full">
                    <Save className="mr-2 h-4 w-4" /> Salvar Diferenciais
                  </Button>
                </form>
              </AccordionContent>
            </AccordionItem>

             {/* Seção Nossa História */}
            <AccordionItem value="item-4">
               <div className="flex w-full items-center justify-between">
                  <AccordionTrigger className="text-xl font-headline text-primary flex-1 hover:no-underline">Nossa História</AccordionTrigger>
                  <div className="py-4 pr-4 pl-2">
                      <SectionToggle name="ourHistory.enabled" isSubmitting={isSubmitting} />
                  </div>
               </div>
              <AccordionContent className="space-y-6 pt-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="ourHistory.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Seção</FormLabel>
                        <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="ourHistory.content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conteúdo</FormLabel>
                        <FormControl><RichTextEditor value={field.value} onChange={field.onChange} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    <Save className="mr-2 h-4 w-4" /> Salvar Nossa História
                  </Button>
                </form>
              </AccordionContent>
            </AccordionItem>

            {/* Seção Equipe */}
            <AccordionItem value="item-5">
               <div className="flex w-full items-center justify-between">
                  <AccordionTrigger className="text-xl font-headline text-primary flex-1 hover:no-underline">Equipe</AccordionTrigger>
                  <div className="py-4 pr-4 pl-2">
                      <SectionToggle name="attorneys.enabled" isSubmitting={isSubmitting} />
                  </div>
               </div>
              <AccordionContent className="space-y-6 pt-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="attorneys.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Seção</FormLabel>
                        <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="attorneys.subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtítulo da Seção</FormLabel>
                        <FormControl><RichTextEditor value={field.value} onChange={field.onChange} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <h3 className="font-semibold mt-4">Membros da Equipe</h3>
                   {attorneyFields.map((item, index) => {
                     const imageUrl = form.watch(`attorneys.members.${index}.imageUrl`);
                     return (
                      <div key={item.id} className="p-4 border rounded-md space-y-4 bg-background relative">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-4 right-4 h-7 w-7"
                            onClick={() => removeAttorney(index)}
                            disabled={isSubmitting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex flex-col sm:flex-row items-start gap-4">
                            <div className="flex-shrink-0">
                                <FormLabel>Pré-visualização</FormLabel>
                                <div className="mt-2 w-28 h-28 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                                    {imageUrl ? (
                                        <Image src={imageUrl} alt={`Preview`} width={112} height={112} className="object-cover w-full h-full" />
                                    ) : (
                                        <ImageIcon className="w-12 h-12 text-muted-foreground" />
                                    )}
                                </div>
                            </div>
                            <div className="flex-grow space-y-4 w-full">
                                <FormField
                                    control={form.control}
                                    name={`attorneys.members.${index}.name`}
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome do Membro</FormLabel>
                                        <FormControl><Input {...field} disabled={isSubmitting || isUploading === index} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`attorneys.members.${index}.title`}
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cargo</FormLabel>
                                        <FormControl><Input {...field} disabled={isSubmitting || isUploading === index} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                          </div>
                         <FormField
                            control={form.control}
                            name={`attorneys.members.${index}.bio`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio do Membro</FormLabel>
                                <FormControl><RichTextEditor value={field.value} onChange={field.onChange} disabled={isSubmitting || isUploading === index} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`attorneys.members.${index}.imageUrl`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL da Imagem</FormLabel>
                                 <div className="flex items-center gap-2">
                                  <FormControl>
                                    <Input {...field} disabled={isSubmitting || isUploading === index} />
                                  </FormControl>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    disabled={isSubmitting || isUploading === index}
                                    onClick={() => fileInputRefs.current[index]?.click()}
                                  >
                                    {isUploading === index ? '...' : <Upload className="h-4 w-4" />}
                                  </Button>
                                  <input
                                    type="file"
                                    ref={(el) => (fileInputRefs.current[index] = el)}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, index)}
                                  />
                                </div>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                      </div>
                   )})}
                   <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => appendAttorney({ 
                        id: `new-${Date.now()}`,
                        name: "", 
                        title: "", 
                        bio: "", 
                        imageUrl: "",
                        bioFormat: "default"
                      })}
                      disabled={isSubmitting}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Membro
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
                      <Save className="mr-2 h-4 w-4" /> Salvar Equipe
                    </Button>
                </form>
              </AccordionContent>
            </AccordionItem>

           {/* Seção Publicações */}
            <AccordionItem value="item-6">
               <div className="flex w-full items-center justify-between">
                  <AccordionTrigger className="text-xl font-headline text-primary flex-1 hover:no-underline">Publicações</AccordionTrigger>
                  <div className="py-4 pr-4 pl-2">
                      <SectionToggle name="testimonials.enabled" isSubmitting={isSubmitting} />
                  </div>
               </div>
              <AccordionContent className="space-y-6 pt-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="testimonials.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Seção</FormLabel>
                        <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="testimonials.subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtítulo da Seção</FormLabel>
                        <FormControl><RichTextEditor value={field.value} onChange={field.onChange} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4 pt-4 p-4 border rounded-md bg-background/50">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg flex items-center gap-2"><Instagram className="h-5 w-5" /> Instagram</h3>
                        <SectionToggle name="testimonials.instagram.enabled" isSubmitting={isSubmitting} />
                    </div>
                    {instagramPostFields.map((item, index) => (
                        <div key={item.id} className="p-4 border rounded-md space-y-4 bg-background/50 relative">
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-4 right-4 h-7 w-7"
                                onClick={() => removeInstagramPost(index)}
                                disabled={isSubmitting}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <FormField
                                control={form.control}
                                name={`testimonials.instagram.posts.${index}.postUrl`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Link da Publicação {index + 1}</FormLabel>
                                    <FormControl>
                                      <Input {...field} disabled={isSubmitting} placeholder='https://www.instagram.com/p/...' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendInstagramPost({ postUrl: "" })}
                        disabled={isSubmitting}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Post
                    </Button>
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    <Save className="mr-2 h-4 w-4" /> Salvar Publicações
                  </Button>
                </form>
              </AccordionContent>
            </AccordionItem>

             {/* Seção Contato */}
            <AccordionItem value="item-7">
              <div className="flex w-full items-center justify-between">
                  <AccordionTrigger className="text-xl font-headline text-primary flex-1 hover:no-underline">Contato</AccordionTrigger>
                  <div className="py-4 pr-4 pl-2">
                    <SectionToggle name="contact.enabled" isSubmitting={isSubmitting} />
                  </div>
              </div>
              <AccordionContent className="space-y-6 pt-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="contactInfo.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl><RichTextEditor value={field.value} onChange={field.onChange} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactInfo.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactInfo.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone (Exibição)</FormLabel>
                        <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactInfo.whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp (Apenas Números)</FormLabel>
                        <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    <Save className="mr-2 h-4 w-4" /> Salvar Contato
                  </Button>
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Form>

        {/* Gerenciamento de Usuários (Contexto Separado) */}
        <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-bold font-headline text-primary">Gerenciamento de Usuários</h2>
            
            <div className="p-4 border rounded-md bg-background">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Users className="h-5 w-5" /> Usuários Cadastrados</h3>
                <div className="space-y-2">
                    {users.map(user => (
                        <div key={user.username} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                            <span className="text-sm font-medium">{user.username}</span>
                            {users.length > 1 && (
                                <Button variant="destructive" size="icon" className="h-7 w-7" onClick={() => handleRemoveUser(user.username)} disabled={isSubmitting}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 border rounded-md bg-background">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><UserPlus className="h-5 w-5" /> Adicionar Novo Usuário</h3>
                <Form {...newUserForm}>
                  <form onSubmit={newUserForm.handleSubmit(handleAddUser)} className="space-y-4">
                    <FormField
                      control={newUserForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome de Usuário</FormLabel>
                          <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={newUserForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl><Input type="password" {...field} disabled={isSubmitting} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" variant="outline" disabled={isSubmitting}>
                       <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Usuário
                    </Button>
                  </form>
                </Form>
            </div>
        </div>
      </div>
    </div>
  );
}
