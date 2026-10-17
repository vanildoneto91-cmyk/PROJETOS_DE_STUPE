alter table cursos enable row level security;
alter table aluno enable row level security;

-- curso

drop policy if exists "curso_select_anon" on curso;
create policy "curso_select_anon" on curso for select to anon using (true);

drop policy if exists "curso_insert_anon" on cursos;
create policy "curso_insert_anon" on cursos for insert to anon using (true);
    
drop policy if exists "curso_update_anon" on cursos;
create policy "curso_update_anon" on cursos for update to anon using (true) with check (true);

drop policy if exists "curso_delete_anon" on cursos;
create policy "curso_delete_anon" on cursos for delete to anon using (true);

-- aluno

drop policy if exists "aluno_select_anon" on aluno;
create policy "aluno_select_anon" on aluno for select to anon using (true);

drop policy if exists "aluno_insert_anon" on aluno;
create policy "aluno_insert_anon" on aluno for insert to anon using (true);

drop policy if exists "aluno_update_anon" on aluno;
create policy "aluno_update_anon" on aluno for update to anon using (true) with check (true);

drop policy if exists "aluno_delete_anon" on aluno;
create policy "aluno_delete_anon" on aluno for delete to anon using (true);

