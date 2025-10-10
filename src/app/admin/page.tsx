
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { loadContent, ContentData } from "@/lib/content-loader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  id: z.string(),
  name: z.string().min(1, "Nome é obrigatório."),
  title: z.string().min(1, "Cargo é obrigatório."),
  bio: z.string().min(1, "Bio é obrigatória."),
  imageId: z.string(),
});

const testimonialPostSchema = z.object({
  permalink: z.string().url("Deve ser um URL válido do Instagram."),
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
  const [initialData, setInitialData] = useState<ContentData | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || undefined,
  });

  useEffect(() => {
    // Carrega o conteúdo do JSON quando o componente monta
    const content = loadContent();
    setInitialData(content);
    form.reset(content);
  }, [form]);

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
        description: "As alterações foram enviadas para o GitHub e o site será atualizado em breve.",
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
                   {form.getValues().attorneys.members.map((_, index) => (
                      <div key={index} className="p-4 border rounded-md space-y-4 bg-background">
                         <FormField
                            control={form.control}
                            name={`attorneys.members.${index}.name`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome do Membro {index + 1}</FormLabel>
                                <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
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
                                <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
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
                                <FormControl><Textarea {...field} disabled={isSubmitting} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`attorneys.members.${index}.imageId`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>ID da Imagem {index + 1}</FormLabel>
                                <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                                <FormDescription>O ID da imagem do arquivo placeholder-images.json.</FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                      </div>
                   ))}
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
                   {form.getValues().testimonials.posts.map((_, index) => (
                      <div key={index} className="p-4 border rounded-md space-y-4 bg-background">
                         <FormField
                            control={form.control}
                            name={`testimonials.posts.${index}.permalink`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link da Publicação {index + 1}</FormLabel>
                                <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                                <FormDescription>URL completo do post no Instagram.</FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                      </div>
                   ))}
                </AccordionContent>
              </AccordionItem>

            </Accordion>

            <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
