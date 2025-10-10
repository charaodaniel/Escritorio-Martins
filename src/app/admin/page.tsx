
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useRef } from "react";
import type { ContentData } from "@/lib/content-loader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlusCircle, Trash2, Upload } from "lucide-react";

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

const ourHistorySchema = z.object({
  title: z.string().min(1, "Título da história é obrigatório."),
  paragraphs: z.array(z.string().min(1, "Parágrafo não pode ser vazio.")).min(1, "É necessário pelo menos um parágrafo."),
});

const attorneyMemberSchema = z.object({
  id: z.string().min(1, "ID é obrigatório."),
  name: z.string().min(1, "Nome é obrigatório."),
  title: z.string().min(1, "Cargo é obrigatório."),
  bio: z.string().min(1, "Bio é obrigatória."),
  imageUrl: z.string().url("Deve ser um URL válido ou caminho local (ex: /foto.jpg)."),
});

const testimonialPostSchema = z.object({
  permalink: z.string().url("Por favor, insira um URL de publicação do Instagram válido."),
});


const formSchema = z.object({
  hero: heroSchema,
  practiceAreas: z.object({
    title: z.string().min(1, "Título da seção é obrigatório."),
    subtitle: z.string().min(1, "Subtítulo da seção é obrigatório."),
    areas: z.array(practiceAreaSchema),
  }),
  whyUs: z.object({
    title: z.string().min(1, "Título da seção é obrigatório."),
    subtitle: z.string().min(1, "Subtítulo da seção é obrigatório."),
    features: z.array(whyUsFeatureSchema),
  }),
  ourHistory: ourHistorySchema,
  attorneys: z.object({
    title: z.string().min(1, "Título da seção é obrigatório."),
    subtitle: z.string().min(1, "Subtítulo da seção é obrigatório."),
    members: z.array(attorneyMemberSchema),
  }),
  testimonials: z.object({
      title: z.string().min(1, "Título da seção é obrigatório."),
      subtitle: z.string().min(1, "Subtítulo da seção é obrigatório."),
      posts: z.array(testimonialPostSchema),
  }),
});


export default function AdminPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState<number | null>(null);
  const [initialData, setInitialData] = useState<ContentData | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || undefined,
  });

  const { fields: attorneyFields, append: appendAttorney, remove: removeAttorney } = useFieldArray({
    control: form.control,
    name: "attorneys.members",
  });

  const { fields: postFields, append: appendPost, remove: removePost } = useFieldArray({
    control: form.control,
    name: "testimonials.posts",
  });

  useEffect(() => {
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

    fetchContent();
  }, [form, toast]);


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
        description: `Imagem carregada e caminho salvo como: ${filePath}`,
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

  if (!initialData) {
    return <div className="flex justify-center items-center h-screen">Carregando painel...</div>;
  }
  

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-headline mb-2 text-primary">Painel de Edição</h1>
        <p className="text-muted-foreground mb-8">Altere o conteúdo do site aqui. As mudanças serão refletidas após o deploy automático.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              
              {/* Seção Hero */}
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-headline text-primary">Seção Principal (Hero)</AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <FormField
                    control={form.control}
                    name="hero.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título Principal</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isSubmitting} />
                        </FormControl>
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
                        <FormControl>
                          <Textarea {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Seção Áreas de Atuação */}
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-headline text-primary">Áreas de Atuação</AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
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
                        <FormControl><Textarea {...field} disabled={isSubmitting} /></FormControl>
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
                                <FormControl><Textarea {...field} disabled={isSubmitting} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                      </div>
                   ))}
                </AccordionContent>
              </AccordionItem>

              {/* Seção Diferenciais */}
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl font-headline text-primary">Diferenciais (Por que nos escolher?)</AccordionTrigger>
                 <AccordionContent className="space-y-6 pt-4">
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
                        <FormControl><Textarea {...field} disabled={isSubmitting} /></FormControl>
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
                                <FormControl><Textarea {...field} disabled={isSubmitting} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                      </div>
                   ))}
                </AccordionContent>
              </AccordionItem>

               {/* Seção Nossa História */}
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl font-headline text-primary">Nossa História</AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
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
                  {form.getValues().ourHistory.paragraphs.map((_, index) => (
                     <FormField
                        key={index}
                        control={form.control}
                        name={`ourHistory.paragraphs.${index}`}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Parágrafo {index + 1}</FormLabel>
                            <FormControl><Textarea {...field} rows={4} disabled={isSubmitting} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* Seção Equipe */}
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-xl font-headline text-primary">Equipe</AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
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
                        <FormControl><Textarea {...field} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <h3 className="font-semibold mt-4">Membros da Equipe</h3>
                   {attorneyFields.map((item, index) => (
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
                            <span className="sr-only">Remover Membro</span>
                          </Button>
                         <FormField
                            control={form.control}
                            name={`attorneys.members.${index}.name`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome do Membro {index + 1}</FormLabel>
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
                                <FormLabel>Cargo do Membro {index + 1}</FormLabel>
                                <FormControl><Input {...field} disabled={isSubmitting || isUploading === index} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`attorneys.members.${index}.bio`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio do Membro {index + 1}</FormLabel>
                                <FormControl><Textarea {...field} disabled={isSubmitting || isUploading === index} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`attorneys.members.${index}.imageUrl`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL da Imagem {index + 1}</FormLabel>
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
                                    <Upload className="h-4 w-4" />
                                  </Button>
                                  <input
                                    type="file"
                                    ref={(el) => (fileInputRefs.current[index] = el)}
                                    className="hidden"
                                    accept="image/png, image/jpeg, image/webp"
                                    onChange={(e) => handleFileChange(e, index)}
                                    disabled={isSubmitting || isUploading === index}
                                  />
                                </div>
                                <FormDescription>
                                  {isUploading === index ? 'Carregando imagem...' : 'Caminho local (ex: /minha-foto.jpg) ou URL completa.'}
                                </FormDescription>
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
                      className="mt-2"
                      onClick={() => appendAttorney({ 
                        id: `new-${Date.now()}`,
                        name: "", 
                        title: "", 
                        bio: "", 
                        imageUrl: "" 
                      })}
                      disabled={isSubmitting}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar Membro
                    </Button>
                </AccordionContent>
              </AccordionItem>

             {/* Seção Publicações */}
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-xl font-headline text-primary">Publicações (Instagram)</AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
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
                        <FormControl><Textarea {...field} disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <h3 className="font-semibold mt-4">Links das Publicações</h3>
                   {postFields.map((item, index) => (
                      <div key={item.id} className="p-4 border rounded-md space-y-4 bg-background relative">
                         <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-4 right-4 h-7 w-7"
                            onClick={() => removePost(index)}
                            disabled={isSubmitting}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remover Publicação</span>
                          </Button>
                         <FormField
                            control={form.control}
                            name={`testimonials.posts.${index}.permalink`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link da Publicação {index + 1}</FormLabel>
                                <FormControl><Input {...field} disabled={isSubmitting} placeholder="https://www.instagram.com/p/seu-post-aqui" /></FormControl>
                                <FormDescription>No Instagram, clique nos três pontinhos (...) acima da publicação e selecione 'Copiar link'. Cole o link aqui.</FormDescription>
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
                      className="mt-2"
                      onClick={() => appendPost({ permalink: "" })}
                      disabled={isSubmitting}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar Publicação
                    </Button>
                </AccordionContent>
              </AccordionItem>

            </Accordion>

            <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting || isUploading !== null}>
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
