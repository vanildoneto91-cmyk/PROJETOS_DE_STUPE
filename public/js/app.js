document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica para a Página de Listagem (index.html)
    const listaContainer = document.getElementById('lista-equipamentos');
    if (listaContainer) {
        carregarEquipamentos();
    }

    // 2. Lógica para o Formulário de Cadastro (add-item.html)
    const formItem = document.getElementById('form-item');
    if (formItem) {
        formItem.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const marca = document.getElementById('marca').value;
            const status = document.getElementById('status').value;

            try {
                const { data, error } = await supabaseClient
                    .from('equipamentos')
                    .insert([{ item: nome, marca: marca, status_compra: status }]);

                if (error) {
                    alert('Erro ao atualizar: ' + error.message);
                } else {
                    // Redireciona imediatamente para a lista sem mostrar o alert()
                    window.location.href = 'index.html';
                }
            } catch (err) {
                console.error('Erro ao inserir:', err.message);
                alert('Erro ao salvar o item: ' + err.message);
            }
        });
    }
});

async function carregarEquipamentos() {
    const { data: equipamentos, error } = await supabaseClient
        .from('equipamentos')
        .select('*');

    const container = document.getElementById('lista-equipamentos'); // ou onde mostras a tabela

    if (error) {
        console.error('Erro ao carregar:', error);
        return;
    }

    if (!equipamentos || equipamentos.length === 0) {
        container.innerHTML = '<p>Nenhum equipamento registado.</p>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Marca</th>
                    <th>Status</th>
                    <th style="text-align: center;">Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    equipamentos.forEach(eq => {
        html += `
            <tr>
                <td>${eq.item}</td>
                <td>${eq.marca}</td>
                <td>${eq.status_compra}</td>
                <td style="text-align: center; display: flex; gap: 8px; justify-content: center;">
                    <button class="btn-acao btn-editar" onclick="editarEquipamento(${eq.id})">Editar</button>
                    <button class="btn-acao btn-apagar" onclick="apagarEquipamento(${eq.id})">Apagar</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

// Função para apagar o registo
async function apagarEquipamento(id) {
    if (confirm('Tens a certeza que pretendes apagar este equipamento?')) {
        const { error } = await supabaseClient
            .from('equipamentos')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Erro ao apagar: ' + error.message);
        } else {
            // Recarrega a tabela para atualizar a vista
            carregarEquipamentos();
        }
    }
}

// Função para editar (podes redirecionar para uma página de edição ou preencher o form)
function editarEquipamento(id) {
    // Exemplo: Redirecionar para uma página de edição passando o ID por parâmetro no URL
    window.location.href = `edit-item.html?id=${id}`;
}