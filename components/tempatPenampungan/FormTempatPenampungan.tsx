"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { TempatPenampungan } from "@/lib/types"

const formSchema = z.object({
  nama: z.string().min(3, { message: "Nama harus minimal 3 karakter" }),
  deskripsi: z.string().optional(),
  latitude: z.coerce.number({
    required_error: "Latitude harus diisi",
    invalid_type_error: "Latitude harus berupa angka",
  }),
  longitude: z.coerce.number({
    required_error: "Longitude harus diisi",
    invalid_type_error: "Longitude harus berupa angka",
  }),
  alamat: z.string().min(5, { message: "Alamat harus minimal 5 karakter" }),
  kota: z.string().min(2, { message: "Kota harus minimal 2 karakter" }),
  provinsi: z.string().min(2, { message: "Provinsi harus minimal 2 karakter" }),
  kapasitas: z.coerce.number({
    required_error: "Kapasitas harus diisi",
    invalid_type_error: "Kapasitas harus berupa angka",
  }).min(1, { message: "Kapasitas minimal 1" }),
  jumlah_penghuni_saat_ini: z.coerce.number({
    required_error: "Jumlah penghuni harus diisi",
    invalid_type_error: "Jumlah penghuni harus berupa angka",
  }).min(0, { message: "Jumlah penghuni minimal 0" }),
  status: z.enum(["tersedia", "terbatas", "penuh"], {
    required_error: "Status harus dipilih",
  }),
  nama_kontak: z.string().optional(),
  telepon_kontak: z.string().optional(),
  dilaporkan_oleh: z.coerce.number({
    required_error: "Pelapor harus dipilih",
  }),
  diverifikasi_oleh: z.coerce.number().optional(),
  diverifikasi_pada: z.string().optional(),
  kota_id: z.coerce.number().optional(),
})

interface FormTempatPenampunganProps {
  penampungan?: TempatPenampungan | null
  onSubmit: (data: any) => void
}

export default function FormTempatPenampungan({ penampungan, onSubmit }: FormTempatPenampunganProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: penampungan?.nama || "",
      deskripsi: penampungan?.deskripsi || "",
      latitude: penampungan?.latitude || 0,
      longitude: penampungan?.longitude || 0,
      alamat: penampungan?.alamat || "",
      kota: penampungan?.kota || "",
      provinsi: penampungan?.provinsi || "",
      kapasitas: penampungan?.kapasitas || 0,
      jumlah_penghuni_saat_ini: penampungan?.jumlah_penghuni_saat_ini || 0,
      status: penampungan?.status || "tersedia",
      nama_kontak: penampungan?.nama_kontak || "",
      telepon_kontak: penampungan?.telepon_kontak || "",
      dilaporkan_oleh: penampungan?.dilaporkan_oleh || 1, // Default ke Admin SiagaCrew
      diverifikasi_oleh: penampungan?.diverifikasi_oleh,
      diverifikasi_pada: penampungan?.diverifikasi_pada 
        ? new Date(penampungan.diverifikasi_pada).toISOString().slice(0, 16) 
        : undefined,
      kota_id: penampungan?.kota_id,
    },
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Format waktu verifikasi jika ada
    const formattedData = {
      ...data,
      diverifikasi_pada: data.diverifikasi_pada 
        ? new Date(data.diverifikasi_pada).toISOString() 
        : undefined,
    }
    onSubmit(formattedData)
  }

  // Hitung status berdasarkan kapasitas dan jumlah penghuni
  const calculateStatus = () => {
    const kapasitas = form.getValues("kapasitas")
    const jumlahPenghuni = form.getValues("jumlah_penghuni_saat_ini")
    
    if (jumlahPenghuni >= kapasitas) {
      form.setValue("status", "penuh")
    } else if (jumlahPenghuni >= kapasitas * 0.7) {
      form.setValue("status", "terbatas")
    } else {
      form.setValue("status", "tersedia")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Tempat Penampungan</FormLabel>
              <FormControl>
                <Input placeholder="Nama tempat penampungan" {...field} />
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
                <Textarea placeholder="Deskripsi tempat penampungan" rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input type="number" step="any" placeholder="Latitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input type="number" step="any" placeholder="Longitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="alamat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Textarea placeholder="Alamat lengkap" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="kota"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kota</FormLabel>
                <FormControl>
                  <Input placeholder="Kota" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="provinsi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provinsi</FormLabel>
                <FormControl>
                  <Input placeholder="Provinsi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="kapasitas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kapasitas</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Kapasitas" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e)
                      calculateStatus()
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jumlah_penghuni_saat_ini"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah Penghuni Saat Ini</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Jumlah penghuni" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e)
                      calculateStatus()
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  <SelectItem value="tersedia">Tersedia</SelectItem>
                  <SelectItem value="terbatas">Terbatas</SelectItem>
                  <SelectItem value="penuh">Penuh</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nama_kontak"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Kontak</FormLabel>
                <FormControl>
                  <Input placeholder="Nama kontak" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telepon_kontak"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telepon Kontak</FormLabel>
                <FormControl>
                  <Input placeholder="Telepon kontak" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <FormField
            control={form.control}
            name="diverifikasi_oleh"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diverifikasi Oleh (Opsional)</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(parseInt(value))} 
                  defaultValue={field.value ? field.value.toString() : undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih verifikator" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Admin SiagaCrew</SelectItem>
                    <SelectItem value="4">Petugas Lapangan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.watch("diverifikasi_oleh") && (
          <FormField
            control={form.control}
            name="diverifikasi_pada"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waktu Verifikasi</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit">{penampungan ? "Simpan Perubahan" : "Tambah Penampungan"}</Button>
        </div>
      </form>
    </Form>
  )
}