"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { LaporanBencana, KategoriBencana } from "@/lib/types"
import { getKategoriBencana } from "@/lib/api/kategoriBencana"
import { useEffect } from "react"

const formSchema = z.object({
  kategori_id: z.coerce.number({
    required_error: "Kategori harus dipilih",
  }),
  jenis: z.enum(["banjir", "gempa_bumi", "tanah_longsor", "kebakaran", "lainnya"], {
    required_error: "Jenis bencana harus dipilih",
  }).optional(),
  judul: z.string().min(5, { message: "Judul harus minimal 5 karakter" }),
  deskripsi: z.string().min(10, { message: "Deskripsi harus minimal 10 karakter" }),
  waktu_kejadian: z.string().min(1, { message: "Waktu kejadian harus diisi" }),
  tingkat_keparahan: z.enum(["rendah", "sedang", "tinggi"], {
    required_error: "Tingkat keparahan harus dipilih",
  }),
  status: z.enum(["aktif", "ditangani", "selesai"], {
    required_error: "Status harus dipilih",
  }),
  dilaporkan_oleh: z.coerce.number({
    required_error: "Pelapor harus dipilih",
  }),
  kota_id: z.coerce.number().optional(),
})

interface FormLaporanBencanaProps {
  laporan?: LaporanBencana | null
  onSubmit: (data: any) => void
}

export default function FormLaporanBencana({ laporan, onSubmit }: FormLaporanBencanaProps) {
  const [kategoriBencana, setKategoriBencana] = useState<KategoriBencana[]>([])
  const [isLoadingKategori, setIsLoadingKategori] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kategori_id: laporan?.kategori_id || 0,
      jenis: laporan?.jenis || undefined,
      judul: laporan?.judul || "",
      deskripsi: laporan?.deskripsi || "",
      waktu_kejadian: laporan?.waktu_kejadian 
        ? new Date(laporan.waktu_kejadian).toISOString().slice(0, 16) 
        : new Date().toISOString().slice(0, 16),
      tingkat_keparahan: laporan?.tingkat_keparahan || "rendah",
      status: laporan?.status || "aktif",
      dilaporkan_oleh: laporan?.dilaporkan_oleh || 1, // Default ke Admin SiagaCrew
      kota_id: laporan?.kota_id || undefined,
    },
  })

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const data = await getKategoriBencana()
        setKategoriBencana(data)
      } catch (error) {
        console.error("Error fetching kategori bencana:", error)
      } finally {
        setIsLoadingKategori(false)
      }
    }

    fetchKategori()
  }, [])

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Format waktu kejadian
    const formattedData = {
      ...data,
      waktu_kejadian: new Date(data.waktu_kejadian).toISOString(),
    }
    onSubmit(formattedData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="kategori_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori Bencana</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(parseInt(value))} 
                  defaultValue={field.value ? field.value.toString() : undefined}
                  disabled={isLoadingKategori}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori bencana" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {kategoriBencana.map((kategori) => (
                      <SelectItem key={kategori.id} value={kategori.id.toString()}>
                        {kategori.nama_kategori}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jenis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Bencana</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis bencana" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="banjir">Banjir</SelectItem>
                    <SelectItem value="gempa_bumi">Gempa Bumi</SelectItem>
                    <SelectItem value="tanah_longsor">Tanah Longsor</SelectItem>
                    <SelectItem value="kebakaran">Kebakaran</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="judul"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Laporan</FormLabel>
              <FormControl>
                <Input placeholder="Judul laporan bencana" {...field} />
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
                <Textarea placeholder="Deskripsi detail kejadian bencana" rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="waktu_kejadian"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waktu Kejadian</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tingkat_keparahan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tingkat Keparahan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tingkat keparahan" />
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <SelectItem value="aktif">Aktif</SelectItem>
                    <SelectItem value="ditangani">Ditangani</SelectItem>
                    <SelectItem value="selesai">Selesai</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dilaporkan_oleh"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dilaporkan Oleh</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(parseInt(value))} 
                  defaultValue={field.value ? field.value.toString() : undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih pelapor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Admin SiagaCrew</SelectItem>
                    <SelectItem value="2">Relawan Siaga</SelectItem>
                    <SelectItem value="3">Warga Publik</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit">{laporan ? "Simpan Perubahan" : "Tambah Laporan"}</Button>
        </div>
      </form>
    </Form>
  )
}