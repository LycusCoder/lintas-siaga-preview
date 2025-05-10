"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { KebutuhanPenampungan, TempatPenampungan } from "@/lib/types"
import { getTempatPenampungan } from "@/lib/api/tempatPenampungan"

const formSchema = z.object({
  tempat_penampungan_id: z.coerce.number({
    required_error: "Tempat penampungan harus dipilih",
  }),
  kategori: z.enum(["makanan", "air", "obat", "pakaian", "selimut", "lainnya"], {
    required_error: "Kategori harus dipilih",
  }),
  nama_kebutuhan: z.string().min(3, { message: "Nama kebutuhan harus minimal 3 karakter" }),
  deskripsi: z.string().optional(),
  jumlah: z.coerce.number({
    required_error: "Jumlah harus diisi",
    invalid_type_error: "Jumlah harus berupa angka",
  }).min(1, { message: "Jumlah minimal 1" }),
  prioritas: z.enum(["rendah", "sedang", "tinggi"], {
    required_error: "Prioritas harus dipilih",
  }),
  status: z.enum(["dibutuhkan", "terpenuhi_sebagian", "terpenuhi"], {
    required_error: "Status harus dipilih",
  }),
})

interface FormKebutuhanPenampunganProps {
  kebutuhan?: KebutuhanPenampungan | null
  onSubmit: (data: any) => void
}

export default function FormKebutuhanPenampungan({ kebutuhan, onSubmit }: FormKebutuhanPenampunganProps) {
  const [tempatPenampungan, setTempatPenampungan] = useState<TempatPenampungan[]>([])
  const [isLoadingPenampungan, setIsLoadingPenampungan] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tempat_penampungan_id: kebutuhan?.tempat_penampungan_id || 0,
      kategori: kebutuhan?.kategori || "makanan",
      nama_kebutuhan: kebutuhan?.nama_kebutuhan || "",
      deskripsi: kebutuhan?.deskripsi || "",
      jumlah: kebutuhan?.jumlah || 0,
      prioritas: kebutuhan?.prioritas || "sedang",
      status: kebutuhan?.status || "dibutuhkan",
    },
  })

  useEffect(() => {
    const fetchPenampungan = async () => {
      try {
        const data = await getTempatPenampungan()
        setTempatPenampungan(data)
      } catch (error) {
        console.error("Error fetching tempat penampungan:", error)
      } finally {
        setIsLoadingPenampungan(false)
      }
    }

    fetchPenampungan()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="tempat_penampungan_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempat Penampungan</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(parseInt(value))} 
                defaultValue={field.value ? field.value.toString() : undefined}
                disabled={isLoadingPenampungan || !!kebutuhan}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tempat penampungan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tempatPenampungan.map((tempat) => (
                    <SelectItem key={tempat.id} value={tempat.id.toString()}>
                      {tempat.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="kategori"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="makanan">Makanan</SelectItem>
                    <SelectItem value="air">Air</SelectItem>
                    <SelectItem value="obat">Obat</SelectItem>
                    <SelectItem value="pakaian">Pakaian</SelectItem>
                    <SelectItem value="selimut">Selimut</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nama_kebutuhan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Kebutuhan</FormLabel>
                <FormControl>
                  <Input placeholder="Nama kebutuhan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="deskripsi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi (Opsional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Deskripsi kebutuhan" rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="jumlah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Jumlah" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prioritas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioritas</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih prioritas" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="rendah">Rendah</SelectItem>
                    <SelectItem value="sedang">Sedang</SelectItem>
                    <SelectItem value="tinggi">Tinggi</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="dibutuhkan">Dibutuhkan</SelectItem>
                    <SelectItem value="terpenuhi_sebagian">Terpenuhi Sebagian</SelectItem>
                    <SelectItem value="terpenuhi">Terpenuhi</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit">{kebutuhan ? "Simpan Perubahan" : "Tambah Kebutuhan"}</Button>
        </div>
      </form>
    </Form>
  )
}