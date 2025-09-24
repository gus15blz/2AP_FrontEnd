// App JavaScript - File Explorer

// Toggle de pasta
function toggleFolder(element) {
    const content = element.nextElementSibling;
    const chevron = element.querySelector('.fa-chevron-right');
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        chevron.style.transform = 'rotate(90deg)';
    } else {
        content.style.display = 'none';
        chevron.style.transform = 'rotate(0deg)';
    }
}

// Fechar detalhes
function closeDetails() {
    const details = document.getElementById('fileDetails');
    details.style.display = 'none';
}

// Toggle de tema
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

// Atualizar ícone do tema
function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');
    const isDark = document.body.classList.contains('dark-theme');
    const icon = themeToggle.querySelector('i');
    
    if (isDark) {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Alternar para tema claro';
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Alternar para tema escuro';
    }
}

// Carregar tema salvo
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    updateThemeIcon();
}


// Atualizar detalhes do arquivo
function updateFileDetails(fileName) {
    const fileNameEl = document.getElementById('fileName');
    const fileTypeEl = document.getElementById('fileType');
    const propName = document.getElementById('propName');
    const propSize = document.getElementById('propSize');
    const propType = document.getElementById('propType');
    const propModified = document.getElementById('propModified');
    const propCreated = document.getElementById('propCreated');
    
    // Simular dados do arquivo
    const fileData = {
        // Arquivos de desenvolvimento
        'index.html': { type: 'HTML', size: '2.5 KB', modified: 'Hoje, 14:30', created: 'Hoje, 09:15' },
        'style.css': { type: 'CSS', size: '15.2 KB', modified: 'Hoje, 14:25', created: 'Hoje, 09:20' },
        'script.js': { type: 'JavaScript', size: '8.7 KB', modified: 'Hoje, 14:20', created: 'Hoje, 09:25' },
        'config.json': { type: 'JSON', size: '2.1 KB', modified: 'Hoje, 14:15', created: 'Hoje, 09:10' },
        'readme.md': { type: 'Markdown', size: '1.5 KB', modified: 'Hoje, 14:10', created: 'Hoje, 09:05' },
        'package.json': { type: 'JSON', size: '1.2 KB', modified: 'Hoje, 14:05', created: 'Hoje, 09:00' },
        'logo.svg': { type: 'SVG', size: '3.1 KB', modified: 'Ontem, 16:45', created: 'Ontem, 10:30' },
        'favicon.ico': { type: 'ICO', size: '1.2 KB', modified: 'Ontem, 16:40', created: 'Ontem, 10:25' },
        
        // Downloads
        'setup.exe': { type: 'Executável', size: '45.2 MB', modified: 'Hoje, 15:30', created: 'Hoje, 15:30' },
        'documento.pdf': { type: 'PDF', size: '2.1 MB', modified: 'Hoje, 15:25', created: 'Hoje, 15:25' },
        'imagem.jpg': { type: 'JPEG', size: '3.4 MB', modified: 'Ontem, 18:20', created: 'Ontem, 18:20' },
        'video.mp4': { type: 'MP4', size: '125.7 MB', modified: '2 dias atrás', created: '2 dias atrás' },
        'arquivo.zip': { type: 'ZIP', size: '12.3 MB', modified: '3 dias atrás', created: '3 dias atrás' },
        'apresentacao.pptx': { type: 'PowerPoint', size: '8.9 MB', modified: '1 semana atrás', created: '1 semana atrás' },
        'planilha.xlsx': { type: 'Excel', size: '1.2 MB', modified: '1 semana atrás', created: '1 semana atrás' },
        'texto.txt': { type: 'Texto', size: '156 KB', modified: '2 semanas atrás', created: '2 semanas atrás' },
        
        // Imagens
        'foto1.jpg': { type: 'JPEG', size: '2.1 MB', modified: 'Hoje, 16:30', created: 'Hoje, 16:30' },
        'foto2.png': { type: 'PNG', size: '3.4 MB', modified: 'Hoje, 16:25', created: 'Hoje, 16:25' },
        'foto3.jpg': { type: 'JPEG', size: '1.8 MB', modified: 'Ontem, 17:45', created: 'Ontem, 17:45' },
        'foto4.png': { type: 'PNG', size: '4.2 MB', modified: 'Ontem, 17:40', created: 'Ontem, 17:40' },
        'foto5.jpg': { type: 'JPEG', size: '2.7 MB', modified: '2 dias atrás', created: '2 dias atrás' },
        'foto6.png': { type: 'PNG', size: '3.1 MB', modified: '2 dias atrás', created: '2 dias atrás' },
        'foto7.jpg': { type: 'JPEG', size: '2.9 MB', modified: '3 dias atrás', created: '3 dias atrás' },
        'foto8.png': { type: 'PNG', size: '4.5 MB', modified: '3 dias atrás', created: '3 dias atrás' },
        'foto9.jpg': { type: 'JPEG', size: '1.9 MB', modified: '1 semana atrás', created: '1 semana atrás' },
        'foto10.png': { type: 'PNG', size: '3.8 MB', modified: '1 semana atrás', created: '1 semana atrás' },
        'foto11.jpg': { type: 'JPEG', size: '2.3 MB', modified: '1 semana atrás', created: '1 semana atrás' },
        'foto12.png': { type: 'PNG', size: '4.1 MB', modified: '2 semanas atrás', created: '2 semanas atrás' },
        'foto13.jpg': { type: 'JPEG', size: '2.6 MB', modified: '2 semanas atrás', created: '2 semanas atrás' },
        'foto14.png': { type: 'PNG', size: '3.9 MB', modified: '2 semanas atrás', created: '2 semanas atrás' },
        'foto15.jpg': { type: 'JPEG', size: '2.4 MB', modified: '3 semanas atrás', created: '3 semanas atrás' },
        
        // Documentos
        'relatorio.pdf': { type: 'PDF', size: '1.2 MB', modified: 'Hoje, 17:30', created: 'Hoje, 17:30' },
        'contrato.docx': { type: 'Word', size: '156 KB', modified: 'Hoje, 17:25', created: 'Hoje, 17:25' },
        'apresentacao.pptx': { type: 'PowerPoint', size: '8.9 MB', modified: 'Ontem, 19:15', created: 'Ontem, 19:15' },
        'planilha.xlsx': { type: 'Excel', size: '1.2 MB', modified: 'Ontem, 19:10', created: 'Ontem, 19:10' },
        'notas.txt': { type: 'Texto', size: '89 KB', modified: '2 dias atrás', created: '2 dias atrás' },
        'manual.pdf': { type: 'PDF', size: '3.4 MB', modified: '1 semana atrás', created: '1 semana atrás' },
        
        // Pastas
        'Documentos': { type: 'Pasta', size: '2.3 MB', modified: 'Hoje, 18:00', created: 'Hoje, 09:00' },
        'Downloads': { type: 'Pasta', size: '1.8 MB', modified: 'Hoje, 17:45', created: 'Hoje, 09:00' },
        'Imagens': { type: 'Pasta', size: '5.2 MB', modified: 'Ontem, 20:30', created: 'Ontem, 10:00' },
        'Projetos': { type: 'Pasta', size: '15.7 MB', modified: '2 dias atrás', created: '2 dias atrás' }
    };
    
    const data = fileData[fileName] || {
        type: 'Arquivo',
        size: '0 KB',
        modified: 'Desconhecido',
        created: 'Desconhecido'
    };
    
    fileNameEl.textContent = fileName;
    fileTypeEl.textContent = data.type;
    propName.textContent = fileName;
    propSize.textContent = data.size;
    propType.textContent = data.type;
    propModified.textContent = data.modified;
    propCreated.textContent = data.created;
}

// Obter tipo de arquivo
function getFileType(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    const types = {
        'html': 'HTML',
        'css': 'CSS',
        'js': 'JavaScript',
        'svg': 'SVG',
        'png': 'PNG',
        'jpg': 'JPEG',
        'jpeg': 'JPEG',
        'pdf': 'PDF',
        'docx': 'Word',
        'xlsx': 'Excel'
    };
    return types[extension] || 'Arquivo';
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('File Explorer carregado!');
    
    // Carregar tema
    loadTheme();
    
    // Toggle de tema
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    
    // Busca
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const fileCards = document.querySelectorAll('.file-card');
            const fileItems = document.querySelectorAll('.file-item');
            
            [...fileCards, ...fileItems].forEach(item => {
                const fileName = item.querySelector('.file-name, span').textContent.toLowerCase();
                if (fileName.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Abas de detalhes
    const detailTabs = document.querySelectorAll('.detail-tab');
    detailTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            detailTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Botões de ação
    const actionBtns = document.querySelectorAll('.btn-action');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            alert(`Ação "${action}" executada!`);
        });
    });
    
    // Cards de arquivo
    const fileCards = document.querySelectorAll('.file-card');
    fileCards.forEach(card => {
        card.addEventListener('click', function() {
            const fileName = this.getAttribute('data-file');
            updateFileDetails(fileName);
            
            const details = document.getElementById('fileDetails');
            details.style.display = 'flex';
        });
    });
    
    // Itens de arquivo na sidebar
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach(item => {
        item.addEventListener('click', function() {
            const fileName = this.querySelector('span').textContent;
            updateFileDetails(fileName);
            
            const details = document.getElementById('fileDetails');
            details.style.display = 'flex';
        });
    });
    
    // Colapsar sidebar
    const collapseBtn = document.querySelector('.btn-collapse');
    if (collapseBtn) {
        collapseBtn.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Opções de visualização
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Adicionar estilos dinâmicos
    const style = document.createElement('style');
    style.textContent = `
        .file-item.selected {
            background: rgba(102, 126, 234, 0.1);
        }
        .sidebar.collapsed {
            width: 60px;
        }
        .sidebar.collapsed .sidebar-header h3,
        .sidebar.collapsed .quick-access,
        .sidebar.collapsed .file-tree {
            display: none;
        }
    `;
    document.head.appendChild(style);
    
    // Atalhos de teclado
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            closeDetails();
        }
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            window.location.href = 'about.html';
        }
    });
    
    // Itens de acesso rápido
    const quickItems = document.querySelectorAll('.quick-item');
    quickItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemName = this.querySelector('span').textContent;
            const icon = this.querySelector('i');
            
            // Remover seleção anterior
            quickItems.forEach(qi => qi.classList.remove('active'));
            // Adicionar seleção atual
            this.classList.add('active');
            
            // Atualizar path bar
            const pathBar = document.querySelector('.path-bar');
            if (pathBar) {
                pathBar.innerHTML = `
                    <i class="fas fa-home"></i>
                    <span>/</span>
                    <span>${itemName}</span>
                `;
            }
            
            // Atualizar conteúdo principal baseado no item selecionado
            updateMainContent(itemName, icon.className);
        });
    });
    
    // Função para atualizar conteúdo principal
    function updateMainContent(location, iconClass) {
        const contentHeader = document.querySelector('.content-header h2');
        const itemCount = document.querySelector('.item-count');
        const fileGrid = document.querySelector('.file-grid');
        
        // Dados simulados para cada localização
        const locationData = {
            'Início': {
                title: 'Início',
                count: '12 itens',
                files: [
                    { name: 'Documentos', icon: 'fas fa-folder', size: '2.3 MB', date: 'Hoje' },
                    { name: 'Downloads', icon: 'fas fa-folder', size: '1.8 MB', date: 'Hoje' },
                    { name: 'Imagens', icon: 'fas fa-folder', size: '5.2 MB', date: 'Ontem' },
                    { name: 'Projetos', icon: 'fas fa-folder', size: '15.7 MB', date: '2 dias' },
                    { name: 'config.json', icon: 'fas fa-file-code', size: '2.1 KB', date: 'Hoje' },
                    { name: 'readme.md', icon: 'fas fa-file-alt', size: '1.5 KB', date: 'Hoje' },
                    { name: 'package.json', icon: 'fas fa-file-code', size: '1.2 KB', date: 'Hoje' },
                    { name: 'index.html', icon: 'fas fa-file-code', size: '2.5 KB', date: 'Hoje' },
                    { name: 'style.css', icon: 'fas fa-file-code', size: '15.2 KB', date: 'Hoje' },
                    { name: 'script.js', icon: 'fas fa-file-code', size: '8.7 KB', date: 'Hoje' },
                    { name: 'logo.svg', icon: 'fas fa-image', size: '3.1 KB', date: 'Ontem' },
                    { name: 'favicon.ico', icon: 'fas fa-image', size: '1.2 KB', date: 'Ontem' }
                ]
            },
            'Downloads': {
                title: 'Downloads',
                count: '8 itens',
                files: [
                    { name: 'setup.exe', icon: 'fas fa-file', size: '45.2 MB', date: 'Hoje' },
                    { name: 'documento.pdf', icon: 'fas fa-file-pdf', size: '2.1 MB', date: 'Hoje' },
                    { name: 'imagem.jpg', icon: 'fas fa-image', size: '3.4 MB', date: 'Ontem' },
                    { name: 'video.mp4', icon: 'fas fa-video', size: '125.7 MB', date: '2 dias' },
                    { name: 'arquivo.zip', icon: 'fas fa-file-archive', size: '12.3 MB', date: '3 dias' },
                    { name: 'apresentacao.pptx', icon: 'fas fa-file-powerpoint', size: '8.9 MB', date: '1 semana' },
                    { name: 'planilha.xlsx', icon: 'fas fa-file-excel', size: '1.2 MB', date: '1 semana' },
                    { name: 'texto.txt', icon: 'fas fa-file-alt', size: '156 KB', date: '2 semanas' }
                ]
            },
            'Imagens': {
                title: 'Imagens',
                count: '15 itens',
                files: [
                    { name: 'foto1.jpg', icon: 'fas fa-image', size: '2.1 MB', date: 'Hoje' },
                    { name: 'foto2.png', icon: 'fas fa-image', size: '3.4 MB', date: 'Hoje' },
                    { name: 'foto3.jpg', icon: 'fas fa-image', size: '1.8 MB', date: 'Ontem' },
                    { name: 'foto4.png', icon: 'fas fa-image', size: '4.2 MB', date: 'Ontem' },
                    { name: 'foto5.jpg', icon: 'fas fa-image', size: '2.7 MB', date: '2 dias' },
                    { name: 'foto6.png', icon: 'fas fa-image', size: '3.1 MB', date: '2 dias' },
                    { name: 'foto7.jpg', icon: 'fas fa-image', size: '2.9 MB', date: '3 dias' },
                    { name: 'foto8.png', icon: 'fas fa-image', size: '4.5 MB', date: '3 dias' },
                    { name: 'foto9.jpg', icon: 'fas fa-image', size: '1.9 MB', date: '1 semana' },
                    { name: 'foto10.png', icon: 'fas fa-image', size: '3.8 MB', date: '1 semana' },
                    { name: 'foto11.jpg', icon: 'fas fa-image', size: '2.3 MB', date: '1 semana' },
                    { name: 'foto12.png', icon: 'fas fa-image', size: '4.1 MB', date: '2 semanas' },
                    { name: 'foto13.jpg', icon: 'fas fa-image', size: '2.6 MB', date: '2 semanas' },
                    { name: 'foto14.png', icon: 'fas fa-image', size: '3.9 MB', date: '2 semanas' },
                    { name: 'foto15.jpg', icon: 'fas fa-image', size: '2.4 MB', date: '3 semanas' }
                ]
            },
            'Documentos': {
                title: 'Documentos',
                count: '6 itens',
                files: [
                    { name: 'relatorio.pdf', icon: 'fas fa-file-pdf', size: '1.2 MB', date: 'Hoje' },
                    { name: 'contrato.docx', icon: 'fas fa-file-word', size: '156 KB', date: 'Hoje' },
                    { name: 'apresentacao.pptx', icon: 'fas fa-file-powerpoint', size: '8.9 MB', date: 'Ontem' },
                    { name: 'planilha.xlsx', icon: 'fas fa-file-excel', size: '1.2 MB', date: 'Ontem' },
                    { name: 'notas.txt', icon: 'fas fa-file-alt', size: '89 KB', date: '2 dias' },
                    { name: 'manual.pdf', icon: 'fas fa-file-pdf', size: '3.4 MB', date: '1 semana' }
                ]
            }
        };
        
        const data = locationData[location] || locationData['Início'];
        
        // Atualizar cabeçalho
        if (contentHeader) {
            contentHeader.textContent = data.title;
        }
        
        if (itemCount) {
            itemCount.textContent = data.count;
        }
        
        // Atualizar grid de arquivos
        if (fileGrid) {
            fileGrid.innerHTML = data.files.map(file => `
                <div class="file-card" data-file="${file.name}">
                    <div class="file-icon">
                        <i class="${file.icon}"></i>
                    </div>
                    <div class="file-name">${file.name}</div>
                    <div class="file-meta">${file.size} • ${file.date}</div>
                </div>
            `).join('');
            
            // Re-adicionar event listeners para os novos cards
            const newFileCards = fileGrid.querySelectorAll('.file-card');
            newFileCards.forEach(card => {
                card.addEventListener('click', function() {
                    const fileName = this.getAttribute('data-file');
                    updateFileDetails(fileName);
                    
                    const details = document.getElementById('fileDetails');
                    details.style.display = 'flex';
                });
            });
        }
        
        // Feedback visual
        console.log(`Navegando para: ${location}`);
    }
    
    // Selecionar "Início" por padrão ao carregar a página
    const firstQuickItem = document.querySelector('.quick-item');
    if (firstQuickItem) {
        firstQuickItem.classList.add('active');
        const itemName = firstQuickItem.querySelector('span').textContent;
        const icon = firstQuickItem.querySelector('i');
        updateMainContent(itemName, icon.className);
    }
});
