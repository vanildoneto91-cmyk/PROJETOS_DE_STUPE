require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('configure supabaseUrl and supabaseKey in .env file');
}
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function insertCurso(nome) {
    const { data, error } = await supabase
        .from('cursos')
        .insert([{ nome }]);
        select()
        .single();
    if (error) throw error;
    return data;
}
async function ListarCursos() {
    const { data, error } = await supabase
        .from('cursos')
        .select('id, nome, aluno(count)')
        .order('nome', { ascending: true });
    if (error) throw error;
    return data.map((curso) => ({
        id: curso.id,
        nome: curso.nome,
        total_alunos: curso.alunos[0]?.count ?? 0,
    }));
}