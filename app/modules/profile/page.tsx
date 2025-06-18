"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@/utils/types/supabase";
import { UserCircle, Mail, Globe, Settings, Info } from "lucide-react";
import ProfileField from "@/app/modules/profile/components/ProfileFIled";
import DataSection from "@/app/modules/profile/components/DataSection";


export default function ProfilePage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    getProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      setProfile(data as User);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return;

    try {
      setSaving(true);
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth");
        return;
      }

      // **CAMBIO IMPORTANTE:** Eliminamos 'full_name' de las actualizaciones y
      // asumimos que quieres actualizar 'first_name' y 'last_name'
      const updates = {
        user_id: session.user.id,
        first_name: profile.first_name, // Asegúrate de que profile.first_name existe
        last_name: profile.last_name,   // Asegúrate de que profile.last_name existe
        website_url: profile.website_url,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("user_profiles").upsert(updates);

      if (error) throw error;
      setIsEditing(false);
      await getProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-1/3 rounded-none" />
              <Skeleton className="h-24 w-full rounded-none" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const formatDate = (date: Date | null | undefined): string => {
    if (!date) return "No disponible";
    return new Date(date).toLocaleDateString();
  };

  const formatBoolean = (value: boolean | null | undefined): string => {
    if (value === null || value === undefined) return "No especificado";
    return value ? "Sí" : "No";
  };


  return (
    <div className="w-full mx-auto p-6 bg--100 min-h-screen">
      <Card className="mb-6 bg-white/50 backdrop-blur rounded-none">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Perfil de Usuario</h1>
              <p className="text-gray-500">Gestiona tu información personal y preferencias</p>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    disabled={saving}
                    className="hover:bg-gray-100 rounded-none"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    form="profile-form"
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 rounded-none"
                  >
                    {saving ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 rounded-none"
                >
                  Editar Perfil
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form id="profile-form" onSubmit={updateProfile}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <DataSection title="Datos Personales" icon={<UserCircle className="w-5 h-5 text-blue-600" />}>
                <ProfileField
                  label="Nombre completo"
                  value={profile?.full_name}
                  editing={false} // Dejamos full_name NO editable directamente
                />
                <ProfileField label={"Usuario ID"} value={profile?.user_id ?? "No especificado"} editing={false} />
                <ProfileField label="Bio" value={profile?.bio ?? "No especificado"} editing={false}  />
                
                {/* **CAMBIOS IMPORTANTES:** Hacemos 'Nombre' y 'Apellido' editables y añadimos onChange */}
                <ProfileField
                  label="Nombre"
                  value={profile?.first_name ?? "No especificado"}
                  editing={isEditing} // Ahora es editable cuando isEditing es true
                  onChange={(e) => setProfile(prev => prev ? { ...prev, first_name: e.target.value } : null)}
                />
                <ProfileField
                  label="Apellido"
                  value={profile?.last_name ?? "No especificado"}
                  editing={isEditing} // Ahora es editable cuando isEditing es true
                  onChange={(e) => setProfile(prev => prev ? { ...prev, last_name: e.target.value } : null)}
                />
                <ProfileField label="Fecha de Nacimiento" value={formatDate(profile?.date_of_birth)} editing={false} />

              </DataSection>

              <DataSection title="Contacto" icon={<Mail className="w-5 h-5 text-green-600" />}>
                <ProfileField label="Email (Confirmado)" value={formatDate(profile?.email_confirmed_at)} editing={false}  />
                <ProfileField label="Teléfono" value={profile?.phone_number ?? "No especificado"} editing={false}  />
                <ProfileField label="Dirección" value={profile?.address ?? "No especificado"} editing={false}  />
                <ProfileField label="Ciudad" value={profile?.city ?? "No especificado"} editing={false}  />
                <ProfileField label="País" value={profile?.country ?? "No especificado"} editing={false}  />
                <ProfileField label="Código Postal" value={profile?.postal_code ?? "No especificado"} editing={false}  />
              </DataSection>

              <DataSection title="Web & Social" icon={<Globe className="w-5 h-5 text-purple-600" />}>
                <ProfileField
                  label="Sitio web"
                  value={profile?.website_url}
                  editing={isEditing}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, website_url: e.target.value } : null)}
                  type="url"
                />
                <ProfileField label="Twitter" value={profile?.twitter_username ?? "No especificado"} editing={false}  />
                <ProfileField label="Instagram" value={profile?.instagram_username ?? "No especificado"} editing={false}  />
                <ProfileField label="LinkedIn" value={profile?.linkedin_url ?? "No especificado"} editing={false}  />
                <ProfileField label="GitHub" value={profile?.github_username ?? "No especificado"} editing={false}  />
              </DataSection>

              <DataSection title="Preferencias" icon={<Settings className="w-5 h-5 text-orange-600" />}>
                <ProfileField label="Zona horaria" value={profile?.timezone ?? "No especificado"} editing={false}  />
                <ProfileField label="Locale" value={profile?.locale ?? "No especificado"} editing={false}  />
                <ProfileField label="Idioma preferido" value={profile?.preferred_language ?? "No especificado"} editing={false}  />
                <ProfileField label="Tema preferido" value={profile?.theme_preference ?? "No especificado"} editing={false}  />
                <ProfileField label="Notificaciones activadas" value={formatBoolean(profile?.notifications_enabled)} editing={false}  />
                <ProfileField label="Emails de marketing" value={formatBoolean(profile?.marketing_emails_enabled)} editing={false}  />
              </DataSection>

              <DataSection title="Información Adicional" icon={<Info className="w-5 h-5 text-gray-600" />}>
                 <ProfileField label="Rol" value={profile?.role ?? "Usuario"} editing={false}  />
                <ProfileField label="Usuario Activo" value={formatBoolean(profile?.is_active)} editing={false}  />
                <ProfileField label="Último Login" value={formatDate(profile?.last_login_at)} editing={false}  />
                <ProfileField label="Creado el" value={formatDate(profile?.created_at)} editing={false}  />
                <ProfileField label="Actualizado el" value={formatDate(profile?.updated_at)} editing={false}  />
                <ProfileField label="Intereses" value={profile?.interests?.join(', ') ?? "No especificado"} editing={false}  />
              </DataSection>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}