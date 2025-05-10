"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { getProfil, updateProfil, updatePassword } from "@/lib/api/profil"
import type { Pengguna } from "@/lib/types"
import { User, Shield, MapPin } from "lucide-react"

const profilSchema = z.object({
  name: z.string().min(2, { message: "Nama harus minimal 2 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  phone: z.string().min(10, { message: "Nomor telepon tidak valid" }),
  alamat: z.string().optional(),
  kota: z.string().optional(),
  provinsi: z.string().optional(),
})

const passwordSchema = z
  .object({
    current_password: z.string().min(6, { message: "Password minimal 6 karakter" }),
    new_password: z.string().min(6, { message: "Password baru minimal 6 karakter" }),
    confirm_password: z.string().min(6, { message: "Konfirmasi password minimal 6 karakter" }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Password baru dan konfirmasi password tidak sama",
    path: ["confirm_password"],
  })

export default function ProfilPage() {
  const [pengguna, setPengguna] = useState<Pengguna | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profil")
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null)
  const [updateError, setUpdateError] = useState<string | null>(null)

  const profilForm = useForm<z.infer<typeof profilSchema>>({
    resolver: zodResolver(profilSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      alamat: "",
      kota: "",
      provinsi: "",
    },
  })

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfil()
        setPengguna(data)
        profilForm.reset({
          name: data.name,
          email: data.email,
          phone: data.phone,
          alamat: data.alamat || "",
          kota: data.kota || "",
          provinsi: data.provinsi || "",
        })
      } catch (error) {
        console.error("Error fetching profil:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const onProfilSubmit = async (data: z.infer<typeof profilSchema>) => {
    try {
      setUpdateError(null)
      const updatedProfil = await updateProfil(data)
      setPengguna(updatedProfil)
      setUpdateSuccess("Profil berhasil diperbarui")
      setTimeout(() => setUpdateSuccess(null), 3000)
    } catch (error) {
      console.error("Error updating profil:", error)
      setUpdateError("Gagal memperbarui profil. Silakan coba lagi.")
    }
  }

  const onPasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    try {
      setUpdateError(null)
      await updatePassword(data)
      passwordForm.reset()
      setUpdateSuccess("Password berhasil diperbarui")
      setTimeout(() => setUpdateSuccess(null), 3000)
    } catch (error) {
      console.error("Error updating password:", error)
      setUpdateError("Gagal memperbarui password. Pastikan password lama benar.")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profil Pengguna</h1>

      {updateSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {updateSuccess}
        </div>
      )}

      {updateError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{updateError}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Informasi Pengguna</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <User className="h-16 w-16 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold">{pengguna?.name}</h2>
            <p className="text-gray-500">{pengguna?.email}</p>
            <div className="mt-4 w-full">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Role: </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    pengguna?.role === "admin_ltsg"
                      ? "bg-red-100 text-red-800"
                      : pengguna?.role === "relawan"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {pengguna?.role === "admin_ltsg" ? "Admin LS" : pengguna?.role === "relawan" ? "Relawan" : "Publik"}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Lokasi: </span>
                <span className="text-sm">
                  {pengguna?.kota && pengguna?.provinsi ? `${pengguna.kota}, ${pengguna.provinsi}` : "Belum diatur"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profil">Profil</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {activeTab === "profil" && (
              <Form {...profilForm}>
                <form onSubmit={profilForm.handleSubmit(onProfilSubmit)} className="space-y-4">
                  <FormField
                    control={profilForm.control}
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
                    control={profilForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profilForm.control}
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
                    control={profilForm.control}
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
                      control={profilForm.control}
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
                      control={profilForm.control}
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
                  <Button type="submit" className="w-full">
                    Simpan Perubahan
                  </Button>
                </form>
              </Form>
            )}

            {activeTab === "password" && (
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="current_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Saat Ini</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Password saat ini" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="new_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Baru</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Password baru" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirm_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password Baru</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Konfirmasi password baru" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Ubah Password
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
