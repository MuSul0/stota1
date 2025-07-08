import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://edcuorkphchuobrfqvyb.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'RA75VcMrCapBq6Y9j1yJeF5QynAUQxQz4oZwFDNiaCY';

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY müssen als Umgebungsvariablen gesetzt sein.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function createOrUpdateAdminUser(email: string, password: string, firstName: string, lastName: string) {
  try {
    // Prüfen, ob Benutzer existiert
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) throw listError;

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      console.log(`Benutzer mit E-Mail ${email} existiert bereits. Passwort wird aktualisiert...`);
      const { error: updateError } = await supabase.auth.admin.updateUserById(existingUser.id, {
        password,
        user_metadata: {
          role: 'admin',
          first_name: firstName,
          last_name: lastName
        }
      });
      if (updateError) throw updateError;
      console.log('Passwort und Metadaten erfolgreich aktualisiert.');

      // Profil updaten
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: existingUser.id,
          email,
          role: 'admin',
          first_name: firstName,
          last_name: lastName,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      if (profileError) throw profileError;

      console.log('Profil erfolgreich aktualisiert.');
    } else {
      console.log(`Benutzer mit E-Mail ${email} existiert nicht. Neuer Benutzer wird erstellt...`);
      const { data, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: {
          role: 'admin',
          first_name: firstName,
          last_name: lastName
        },
        email_confirm: true
      });
      if (createError) throw createError;

      // Profil anlegen
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email,
          role: 'admin',
          first_name: firstName,
          last_name: lastName,
          created_at: new Date().toISOString()
        });
      if (profileError) throw profileError;

      console.log('Benutzer und Profil erfolgreich erstellt.');
    }
  } catch (error) {
    console.error('Fehler:', error);
  }
}

// Benutzer anlegen oder aktualisieren
createOrUpdateAdminUser('muhamadsuleiman2@gmail.com', 'MOMOcan1.', 'Suleiman', 'Muhamad');