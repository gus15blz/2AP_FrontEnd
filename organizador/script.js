// Funcionalidades interativas do explorador de arquivos

// Toggle de pastas
function toggleFolder(element) {
    const folderContent = element.nextElementSibling;
    const chevron = element.querySelector('i:first-child');
    
    if (folderContent.classList.contains('open')) {
        folderContent.classList.remove('open');
        chevron.style.transform = 'rotate(0deg)';
    } else {
        folderContent.classList.add('open');
        chevron.style.transform = 'rotate(90deg)';
    }
}

// Fechar detalhes do arquivo
function closeDetails() {
    document.getElementById('fileDetails').style.display = 'none';
}

// Funcionalidade de busca
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const fileCards = document.querySelectorAll('.file-card');
    const fileItems = document.querySelectorAll('.file-item');
    const folderItems = document.querySelectorAll('.folder-item');
    
    // Buscar nos cards de arquivo
    fileCards.forEach(card => {
        const fileName = card.querySelector('.file-name').textContent.toLowerCase();
        if (fileName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = searchTerm ? 'none' : 'block';
        }
    });
    
    // Buscar nos itens da sidebar
    fileItems.forEach(item => {
        const fileName = item.querySelector('span').textContent.toLowerCase();
        if (fileName.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = searchTerm ? 'none' : 'flex';
        }
    });
    
    folderItems.forEach(folder => {
        const folderName = folder.querySelector('.folder-header span').textContent.toLowerCase();
        const hasVisibleFiles = Array.from(folder.querySelectorAll('.file-item')).some(item => 
            item.style.display !== 'none'
        );
        
        if (folderName.includes(searchTerm) || hasVisibleFiles) {
            folder.style.display = 'block';
        } else {
            folder.style.display = searchTerm ? 'none' : 'block';
        }
    });
});

// Funcionalidade de abas de detalhes
const detailTabs = document.querySelectorAll('.detail-tab');

detailTabs.forEach((tab, index) => {
    tab.addEventListener('click', function() {
        // Remove active de todas as abas
        detailTabs.forEach(t => t.classList.remove('active'));
        // Adiciona active na aba clicada
        this.classList.add('active');
        
        console.log(`Aba de detalhes ${index + 1} selecionada`);
    });
});

// Funcionalidade de botões de ação
const actionButtons = document.querySelectorAll('.btn-action');
actionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const action = this.textContent.trim();
        console.log(`Ação: ${action}`);
        
        // Simular ações
        switch(action) {
            case 'Novo':
                alert('Criando novo arquivo/pasta...');
                break;
            case 'Carregar':
                alert('Carregando arquivos...');
                break;
            case 'Ordenar':
                alert('Ordenando arquivos...');
                break;
        }
    });
});

// Funcionalidade de cards de arquivo
const fileCards = document.querySelectorAll('.file-card');
fileCards.forEach(card => {
    card.addEventListener('click', function() {
        const fileName = this.querySelector('.file-name').textContent;
        const fileIcon = this.querySelector('.file-icon i');
        
        // Atualizar detalhes do arquivo
        updateFileDetails(fileName, fileIcon);
        
        // Mostrar painel de detalhes
        document.getElementById('fileDetails').style.display = 'block';
    });
});

// Funcionalidade de itens de arquivo na sidebar
const fileItems = document.querySelectorAll('.file-item');
fileItems.forEach(item => {
    item.addEventListener('click', function() {
        const fileName = this.querySelector('span').textContent;
        console.log(`Arquivo selecionado: ${fileName}`);
        
        // Remove seleção anterior
        fileItems.forEach(f => f.classList.remove('selected'));
        // Adiciona seleção atual
        this.classList.add('selected');
        
        // Atualizar detalhes do arquivo
        updateFileDetails(fileName, this.querySelector('i'));
        
        // Mostrar painel de detalhes
        document.getElementById('fileDetails').style.display = 'block';
    });
});

// Função para atualizar detalhes do arquivo
function updateFileDetails(fileName, iconElement) {
    const fileNameElement = document.getElementById('fileName');
    const propNameElement = document.getElementById('propName');
    const propSizeElement = document.getElementById('propSize');
    const propTypeElement = document.getElementById('propType');
    const propModifiedElement = document.getElementById('propModified');
    
    // Atualizar nome do arquivo
    fileNameElement.textContent = fileName;
    propNameElement.textContent = fileName;
    
    // Atualizar ícone
    const detailsIcon = document.querySelector('.details-header i');
    detailsIcon.className = iconElement.className;
    
    // Simular propriedades do arquivo
    const fileSize = Math.floor(Math.random() * 1000) + 100; // 100-1100 KB
    const fileType = getFileType(fileName);
    const modifiedDate = new Date().toLocaleDateString('pt-BR');
    
    propSizeElement.textContent = `${fileSize} KB`;
    propTypeElement.textContent = fileType;
    propModifiedElement.textContent = `Hoje, ${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}`;
}

// Função para obter tipo do arquivo
function getFileType(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    
    switch(extension) {
        case 'html':
            return 'Documento HTML';
        case 'css':
            return 'Folha de Estilo CSS';
        case 'js':
            return 'Arquivo JavaScript';
        case 'md':
            return 'Documento Markdown';
        case 'json':
            return 'Arquivo JSON';
        case 'txt':
            return 'Documento de Texto';
        case 'pdf':
            return 'Documento PDF';
        case 'doc':
        case 'docx':
            return 'Documento Word';
        case 'xls':
        case 'xlsx':
            return 'Planilha Excel';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return 'Imagem';
        case 'mp4':
        case 'avi':
        case 'mov':
            return 'Vídeo';
        case 'mp3':
        case 'wav':
            return 'Áudio';
        default:
            return 'Arquivo';
    }
}

// Funcionalidade de collapse da sidebar
const collapseBtn = document.querySelector('.btn-collapse');
const sidebar = document.querySelector('.sidebar');

collapseBtn.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
    this.querySelector('i').classList.toggle('fa-chevron-left');
    this.querySelector('i').classList.toggle('fa-chevron-right');
});

// Funcionalidade de opções de visualização
const viewButtons = document.querySelectorAll('.view-btn');
viewButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active de todos os botões
        viewButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona active no botão clicado
        this.classList.add('active');
        
        const viewType = this.querySelector('i').classList.contains('fa-list') ? 'lista' : 
                        this.querySelector('i').classList.contains('fa-th') ? 'grade' : 'detalhes';
        
        console.log(`Visualização alterada para: ${viewType}`);
    });
});

// Adicionar estilos para seleção de arquivos
const style = document.createElement('style');
style.textContent = `
    .file-item.selected {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
    
    .file-item.selected i {
        color: white;
    }
    
    .sidebar.collapsed {
        width: 80px;
    }
    
    .sidebar.collapsed .sidebar-header h3 span,
    .sidebar.collapsed .folder-header span,
    .sidebar.collapsed .file-item span,
    .sidebar.collapsed .quick-item span {
        display: none;
    }
    
    .sidebar.collapsed .quick-access h4 {
        display: none;
    }
`;
document.head.appendChild(style);

// Funcionalidade de tema escuro
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Verificar tema salvo no localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    updateThemeIcon('dark');
} else {
    updateThemeIcon('light');
}

// Função para alternar tema
function toggleTheme() {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
        console.log('Tema escuro ativado');
    } else {
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
        console.log('Tema claro ativado');
    }
}

// Função para atualizar ícone do botão
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Alternar para tema claro';
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Alternar para tema escuro';
    }
}

// Event listener para o botão de tema
themeToggle.addEventListener('click', toggleTheme);

// Funcionalidade do modal Sobre Nós
const aboutBtn = document.getElementById('aboutBtn');
const aboutModal = document.getElementById('aboutModal');
const aboutClose = document.getElementById('aboutClose');

// Função para abrir modal
function openAboutModal() {
    aboutModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Previne scroll do body
    console.log('Modal Sobre Nós aberto');
}

// Função para fechar modal
function closeAboutModal() {
    aboutModal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restaura scroll do body
    console.log('Modal Sobre Nós fechado');
}

// Event listeners
aboutBtn.addEventListener('click', openAboutModal);
aboutClose.addEventListener('click', closeAboutModal);

// Fechar modal clicando fora dele
aboutModal.addEventListener('click', function(e) {
    if (e.target === aboutModal) {
        closeAboutModal();
    }
});

// Hero Section - Botões de ação
document.addEventListener('DOMContentLoaded', function() {
    // Botão "Começar Agora"
    const heroBtnPrimary = document.querySelector('.hero-btn.primary');
    if (heroBtnPrimary) {
        heroBtnPrimary.addEventListener('click', function() {
            console.log('Botão Começar Agora clicado!');
            
            // Tentar múltiplas formas de scroll
            const mainApp = document.getElementById('main-app');
            const container = document.querySelector('.container');
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            
            // Primeira tentativa: scroll para o main-app (ID específico)
            if (mainApp) {
                console.log('Fazendo scroll para o main-app...');
                mainApp.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest'
                });
                
                // Adicionar destaque visual temporário
                mainApp.classList.add('highlight');
                
                setTimeout(() => {
                    mainApp.classList.remove('highlight');
                }, 2000);
            }
            // Segunda tentativa: scroll para o container
            else if (container) {
                console.log('Fazendo scroll para o container...');
                container.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest'
                });
                
                // Adicionar destaque visual temporário
                container.classList.add('highlight');
                
                setTimeout(() => {
                    container.classList.remove('highlight');
                }, 2000);
            } 
            // Terceira tentativa: scroll para sidebar
            else if (sidebar) {
                console.log('Fazendo scroll para a sidebar...');
                sidebar.scrollIntoView({ behavior: 'smooth' });
            }
            // Quarta tentativa: scroll para main content
            else if (mainContent) {
                console.log('Fazendo scroll para o main content...');
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
            // Fallback: scroll manual
            else {
                console.log('Usando scroll manual...');
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Botão "Ver Demo"
    const heroBtnSecondary = document.querySelector('.hero-btn.secondary');
    if (heroBtnSecondary) {
        heroBtnSecondary.addEventListener('click', function() {
            // Simular demonstração
            alert('🚀 Demonstração do FileExplorer!\n\n• Organize seus arquivos com facilidade\n• Interface intuitiva e moderna\n• Funcionalidades avançadas\n• Tema claro/escuro\n\nExperimente navegando pelos arquivos!');
        });
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('Explorador de Arquivos carregado!');
    
    // Adicionar evento de teclado para busca rápida
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Fechar detalhes com ESC
        if (e.key === 'Escape') {
            closeDetails();
            closeAboutModal();
        }
        
        // Alternar tema com Ctrl+Shift+D
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            toggleTheme();
        }
    });
    
    // Adicionar funcionalidade aos itens de acesso rápido
    const quickItems = document.querySelectorAll('.quick-item');
    quickItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemName = this.querySelector('span').textContent;
            console.log(`Acesso rápido: ${itemName}`);
            alert(`Navegando para ${itemName}...`);
        });
    });
});
