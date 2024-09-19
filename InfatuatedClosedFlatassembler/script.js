document.addEventListener('DOMContentLoaded', function() {
  // Função para calcular o total dos números entre parênteses
  function calculateTotal() {
    let total = 0;

    // Seletor de todos os switches que estão marcados (checked)
    const switches = document.querySelectorAll('.switch-item input:checked');

    // Itera por cada switch ativo
    switches.forEach(function(switchItem) {
      const label = switchItem.closest('.switch-item').querySelector('.switch-label').textContent;

      // Expressão regular para buscar números entre parênteses, permitindo vírgulas ou pontos decimais
      const match = label.match(/\(([\d,.]+)\)/);

      if (match) {
        // Converte a string capturada para um número, substituindo a vírgula por ponto
        total += parseFloat(match[1].replace(',', '.'));
      }
    });

    // Atualiza o total na página, formatado com duas casas decimais
    document.getElementById('total').textContent = total.toFixed(2).replace('.', ',');
  }

  // Adiciona o evento 'change' a todos os switches
  document.querySelectorAll('.switch-item input').forEach(function(switchItem) {
    switchItem.addEventListener('change', calculateTotal);
  });

  // Calcula o total ao carregar a página
  calculateTotal();
});
// Função que impede a ativação de checkboxes conflitantes
function manageExclusiveCheckboxes(groups) {
  groups.forEach(group => {
    group.forEach(id => {
      const checkbox = document.getElementById(id);

      checkbox.addEventListener('change', function() {
        if (this.checked) {
          // Desmarca todos os outros checkboxes no grupo, exceto o que foi clicado
          group.forEach(otherId => {
            if (otherId !== id) {
              document.getElementById(otherId).checked = false;
            }
          });
        }
      });
    });
  });
}

// Definir os grupos de checkboxes que não podem ser ativados ao mesmo tempo
const exclusiveGroups = [
  ['1','2','3','4'] // Exemplo de grupo de copos que se excluem mutuamente
];

// Chama a função passando os grupos
manageExclusiveCheckboxes(exclusiveGroups);
