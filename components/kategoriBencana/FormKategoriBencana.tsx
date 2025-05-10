"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { KategoriBencana } from "@/lib/types"

const formSchema = z.object({
  nama_kategori: z.string().min(2, { message: "Nama kategori harus minimal 2 karakter" }),
  deskripsi: z.string().optional(),
})

interface FormKategoriBencanaProps {
  kategori?: KategoriBencana | null
  onSubmit: (data: any) => void
}

export default function FormKategoriBencana({ kategori, onSubmit }: FormKategoriBencanaProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_kategori: kategori?.nama_kategori || "",
      deskripsi: kategori?.deskripsi || "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nama_kategori"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Kategori</FormLabel>
              <FormControl>
                <Input placeholder="Nama kategori bencana" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deskripsi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea placeholder="Deskripsi kategori bencana" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit">{kategori ? "Simpan Perubahan" : "Tambah Kategori"}</Button>
        </div>
      </form>
    </Form>
  )
}
