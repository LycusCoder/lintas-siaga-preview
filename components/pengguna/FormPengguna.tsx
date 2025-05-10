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
import type { Pengguna } from "@/lib/types"

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus minimal 2 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  phone: z.string().min(10, { message: "Nomor telepon tidak valid" }),
  alamat: z.string().optional(),
  kota: z.string().optional(),
  provinsi: z.string().optional(),
  role: z.enum(["publik", "relawan", "admin_ltsg"]),
  status: z.enum(["aktif", "tidak_aktif", "diblokir"]),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }).optional(),
})

interface FormPenggunaProps {
  pengguna?: Pengguna | null
  onSubmit: (data: any) => void
}

export default function FormPengguna({ pengguna, onSubmit }: FormPenggunaProps) {
  const [showPassword, setShowPassword] = useState(!pengguna)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: pengguna?.name || "",
      email: pengguna?.email || "",
      phone: pengguna?.phone || "",
      alamat: pengguna?.alamat || "",
      kota: pengguna?.kota || "",
      provinsi: pengguna?.provinsi || "",
      role: pengguna?.role || "publik",
      status: pengguna?.status || "aktif",
      password: "",
    },
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Jika tidak ada perubahan password, hapus field password
    if (!data.password) {
      delete data.password
    }
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Nama lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Telepon</FormLabel>
              <FormControl>
                <Input placeholder="Nomor telepon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alamat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Textarea placeholder="Alamat lengkap" {...field} />
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="publik">Publik</SelectItem>
                    <SelectItem value="relawan">Relawan</SelectItem>
                    <SelectItem value="admin_ltsg">Admin SiagaCrew</SelectItem>
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
                    <SelectItem value="aktif">Aktif</SelectItem>
                    <SelectItem value="tidak_aktif">Tidak Aktif</SelectItem>
                    <SelectItem value="diblokir">Diblokir</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {showPassword ? (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{pengguna ? "Ubah Password (opsional)" : "Password"}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <Button type="button" variant="outline" onClick={() => setShowPassword(true)}>
            Ubah Password
          </Button>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit">{pengguna ? "Simpan Perubahan" : "Tambah Pengguna"}</Button>
        </div>
      </form>
    </Form>
  )
}
