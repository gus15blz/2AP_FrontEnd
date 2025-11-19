// Sistema RCO - Registro de Notas e Frequência
// Armazenamento de dados
let students = JSON.parse(localStorage.getItem('rco_students')) || [];
let grades = JSON.parse(localStorage.getItem('rco_grades')) || [];
let attendance = JSON.parse(localStorage.getItem('rco_attendance')) || [];

// Credenciais padrão
const DEFAULT_USERNAME = 'professor andre';
const DEFAULT_PASSWORD = '123';

// Verificar se já está logado
const isLoggedIn = localStorage.getItem('rco_logged_in') === 'true';

// Inicializar alunos padrão (turmas)
function initializeDefaultStudents() {
    // Lista de nomes brasileiros realistas
    const nomes = [
        'Ana Clara Silva', 'Bruno Oliveira Santos', 'Carlos Eduardo Lima', 'Daniela Costa', 'Eduardo Martins',
        'Fernanda Alves', 'Gabriel Souza', 'Isabela Rodrigues', 'João Pedro Ferreira', 'Julia Mendes',
        'Lucas Henrique Araújo', 'Mariana Oliveira', 'Nicolas Barbosa', 'Olivia Santos', 'Pedro Henrique Silva',
        'Rafaela Costa', 'Samuel Almeida', 'Thais Ferreira', 'Vitor Hugo Lima', 'Yasmin Souza',
        'André Luiz Santos', 'Beatriz Araújo', 'Caio Rodrigues', 'Débora Martins', 'Enzo Gabriel Silva',
        'Gabriela Costa', 'Henrique Oliveira', 'Isadora Lima', 'João Vitor Santos', 'Larissa Ferreira',
        'Matheus Alves', 'Natália Souza', 'Otávio Martins'
    ];
    
    // Verificar se já existem alunos cadastrados
    if (students.length === 0) {
        const defaultStudents = [];
        
        // Gerar alunos para cada turma (20 alunos por turma)
        const turmas = ['1AP', '2AP', '3AP'];
        const alunosPorTurma = 20;
        
        turmas.forEach(turma => {
            for (let i = 1; i <= alunosPorTurma; i++) {
                const numero = i.toString().padStart(3, '0');
                const nomeIndex = (i - 1) % nomes.length;
                defaultStudents.push({
                    id: `${turma}${numero}`,
                    name: nomes[nomeIndex]
                });
            }
        });
        
        students = defaultStudents;
        saveStudents();
        
        // Inicializar dados falsos (notas e frequência)
        initializeSampleData();
    } else {
        // Atualizar alunos existentes que não têm nomes ou têm nomes genéricos
        const turmas = ['1AP', '2AP', '3AP'];
        let atualizado = false;
        
        students.forEach((student, index) => {
            // Se o nome é genérico (começa com "Aluno") ou está vazio, atualizar
            if (!student.name || student.name.startsWith('Aluno')) {
                const nomeIndex = index % nomes.length;
                student.name = nomes[nomeIndex];
                atualizado = true;
            }
        });
        
        // Se algum aluno foi atualizado, salvar
        if (atualizado) {
            saveStudents();
        }
        
        // Inicializar dados falsos se não existirem
        if (grades.length === 0 && attendance.length === 0) {
            initializeSampleData();
        }
    }
}

// Inicializar dados de exemplo (notas e frequência)
function initializeSampleData() {
    const disciplinas = ['Matemática', 'Português', 'História', 'Geografia', 'Física', 'Química', 'Biologia', 'Inglês'];
    const tiposAvaliacao = ['P1', 'P2', 'Trabalho', 'Atividade'];
    
    // Gerar notas de exemplo para alguns alunos
    const alunosExemplo = students.slice(0, 15); // Primeiros 15 alunos de cada turma
    const hoje = new Date();
    
    alunosExemplo.forEach((aluno, alunoIndex) => {
        // Adicionar 2-3 notas por aluno
        const numNotas = 2 + (alunoIndex % 2); // 2 ou 3 notas
        
        for (let i = 0; i < numNotas; i++) {
            const disciplina = disciplinas[alunoIndex % disciplinas.length];
            const tipo = tiposAvaliacao[i % tiposAvaliacao.length];
            const nota = (5 + Math.random() * 5).toFixed(1); // Nota entre 5.0 e 10.0
            const dataNota = new Date(hoje);
            dataNota.setDate(dataNota.getDate() - (7 + i * 5)); // Datas dos últimos dias
            
            grades.push({
                id: `grade_${aluno.id}_${i}_${Date.now()}`,
                studentId: aluno.id,
                subject: disciplina,
                value: parseFloat(nota),
                type: tipo,
                date: dataNota.toISOString()
            });
        }
        
        // Adicionar frequência de exemplo (últimos 10 dias)
        for (let dia = 0; dia < 10; dia++) {
            const dataFreq = new Date(hoje);
            dataFreq.setDate(dataFreq.getDate() - dia);
            const dataStr = dataFreq.toISOString().split('T')[0];
            
            // 80% de presença, 20% de falta
            const status = Math.random() > 0.2 ? 'presente' : 'ausente';
            
            attendance.push({
                id: `att_${aluno.id}_${dataStr}_${Date.now()}`,
                studentId: aluno.id,
                date: dataStr,
                status: status
            });
        }
    });
    
    saveGrades();
    saveAttendance();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar alunos padrão
    initializeDefaultStudents();
    
    // Verificar login
    if (isLoggedIn) {
        showMainSystem();
    } else {
        showLoginScreen();
    }
    
    // Inicializar formulário de login
    initializeLogin();
});

// Mostrar tela de login
function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('mainSystem').style.display = 'none';
}

// Mostrar sistema principal
function showMainSystem() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainSystem').style.display = 'block';
    
    // Inicializar sistema
    initializeTabs();
    initializeForms();
    updateGradesList();
    updateSelects();
    
    // Configurar data padrão para hoje
    const attendanceDateInput = document.getElementById('attendanceDate');
    if (attendanceDateInput) {
        attendanceDateInput.valueAsDate = new Date();
    }
}

// Inicializar menu lateral
function initializeTabs() {
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            
            // Remover active de todos
            menuItems.forEach(menu => menu.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Adicionar active ao selecionado
            item.classList.add('active');
            document.getElementById(`section-${targetSection}`).classList.add('active');
            
            // Atualizar selects quando acessar a seção de relatórios
            if (targetSection === 'reports') {
                updateSelects();
            }
        });
    });
}

// Inicializar formulário de login
function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Validação simples
            if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
                localStorage.setItem('rco_logged_in', 'true');
                showMainSystem();
            } else {
                alert('Usuário ou senha incorretos!\n\nUsuário: professor andre\nSenha: 123');
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Deseja realmente sair do sistema?')) {
                localStorage.removeItem('rco_logged_in');
                showLoginScreen();
                // Limpar formulário de login
                if (document.getElementById('loginForm')) {
                    document.getElementById('loginForm').reset();
                }
            }
        });
    }
}

// Inicializar formulários
function initializeForms() {
    // Formulário de Notas
    document.getElementById('gradeForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const studentId = document.getElementById('gradeStudent').value;
        const subject = document.getElementById('gradeSubject').value.trim();
        const value = parseFloat(document.getElementById('gradeValue').value);
        const type = document.getElementById('gradeType').value;
        
        grades.push({
            id: Date.now().toString(),
            studentId,
            subject,
            value,
            type,
            date: new Date().toISOString()
        });
        
        saveGrades();
        updateGradesList();
        document.getElementById('gradeForm').reset();
    });
    
    // Sistema de Chamada
    document.getElementById('loadAttendance').addEventListener('click', () => {
        loadAttendanceTable();
    });
    
    document.getElementById('saveAttendance').addEventListener('click', () => {
        saveAttendanceTable();
    });
    
    document.getElementById('selectAllPresent').addEventListener('click', () => {
        selectAllPresent();
    });
    
    // Configurar data padrão para hoje
    const attendanceDateInput = document.getElementById('attendanceDate');
    if (attendanceDateInput) {
        attendanceDateInput.valueAsDate = new Date();
    }
    
    // Gerar Relatório
    document.getElementById('generateReport').addEventListener('click', () => {
        const studentId = document.getElementById('reportStudent').value;
        if (studentId) {
            generateReport(studentId);
        } else {
            alert('Selecione um aluno!');
        }
    });
}

// Salvar dados no localStorage
function saveStudents() {
    localStorage.setItem('rco_students', JSON.stringify(students));
}

function saveGrades() {
    localStorage.setItem('rco_grades', JSON.stringify(grades));
}

function saveAttendance() {
    localStorage.setItem('rco_attendance', JSON.stringify(attendance));
}

// Atualizar selects com alunos
function updateSelects() {
    const selects = ['gradeStudent', 'attendanceStudent', 'reportStudent'];
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return; // Se o select não existir, pular
        
        const currentValue = select.value;
        select.innerHTML = '<option value="">-- Selecione --</option>';
        
        // Verificar se há alunos cadastrados
        if (students.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Nenhum aluno cadastrado';
            option.disabled = true;
            select.appendChild(option);
            return;
        }
        
        // Agrupar alunos por turma
        const studentsByClass = {};
        students.forEach(student => {
            // Extrair turma do ID (1AP, 2AP, 3AP)
            const classMatch = student.id.match(/^(\d+AP)/);
            const className = classMatch ? classMatch[1] : 'Outros';
            
            if (!studentsByClass[className]) {
                studentsByClass[className] = [];
            }
            studentsByClass[className].push(student);
        });
        
        // Adicionar opções agrupadas por turma
        Object.keys(studentsByClass).sort().forEach(className => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = `Turma ${className} - Médio Técnico`;
            
            // Ordenar alunos por nome dentro de cada turma
            studentsByClass[className].sort((a, b) => a.name.localeCompare(b.name));
            
            studentsByClass[className].forEach(student => {
                const option = document.createElement('option');
                option.value = student.id;
                // Para relatórios, mostrar nome completo de forma destacada
                if (selectId === 'reportStudent') {
                    option.textContent = `${student.name} - Matrícula: ${student.id}`;
                } else {
                    option.textContent = `${student.name} (${student.id})`;
                }
                optgroup.appendChild(option);
            });
            
            select.appendChild(optgroup);
        });
        
        if (currentValue) {
            select.value = currentValue;
        }
    });
}

// Atualizar lista de notas
function updateGradesList() {
    const container = document.getElementById('gradesList');
    
    if (grades.length === 0) {
        container.innerHTML = '<div class="empty-message">Nenhuma nota registrada</div>';
        return;
    }
    
    // Mostrar últimas 5 notas
    const recentGrades = grades.slice(-5).reverse();
    
    container.innerHTML = recentGrades.map(grade => {
        const student = students.find(s => s.id === grade.studentId);
        const date = new Date(grade.date).toLocaleDateString('pt-BR');
        return `
            <div class="grade-item">
                <div class="grade-info">
                    <div class="student-name">${student ? student.name : 'Desconhecido'}</div>
                    <div class="student-id">${grade.subject} - ${grade.type}: ${grade.value.toFixed(1)} | ${date}</div>
                </div>
                <button class="delete-btn" onclick="deleteGrade('${grade.id}')">Excluir</button>
            </div>
        `;
    }).join('');
}

// Carregar tabela de chamada
function loadAttendanceTable() {
    const classFilter = document.getElementById('attendanceClass').value;
    const date = document.getElementById('attendanceDate').value;
    const tbody = document.getElementById('attendanceTableBody');
    const saveBtn = document.getElementById('saveAttendance');
    
    if (!date) {
        alert('Selecione uma data!');
        return;
    }
    
    // Filtrar alunos por turma
    let filteredStudents = students;
    if (classFilter) {
        filteredStudents = students.filter(s => s.id.startsWith(classFilter));
    }
    
    if (filteredStudents.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-message">Nenhum aluno encontrado para esta turma</td></tr>';
        saveBtn.disabled = true;
        return;
    }
    
    // Verificar se já existe chamada para esta data
    const existingAttendance = attendance.filter(a => a.date === date);
    
    // Gerar tabela
    tbody.innerHTML = filteredStudents.map((student, index) => {
        const existing = existingAttendance.find(a => a.studentId === student.id);
        const currentStatus = existing ? existing.status : 'presente';
        
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>
                    <div class="attendance-radio-group">
                        <div class="attendance-radio">
                            <input type="radio" name="attendance_${student.id}" value="presente" id="present_${student.id}" ${currentStatus === 'presente' ? 'checked' : ''}>
                            <label for="present_${student.id}">P</label>
                        </div>
                        <div class="attendance-radio">
                            <input type="radio" name="attendance_${student.id}" value="ausente" id="absent_${student.id}" ${currentStatus === 'ausente' ? 'checked' : ''}>
                            <label for="absent_${student.id}">F</label>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    saveBtn.disabled = false;
}

// Salvar chamada
function saveAttendanceTable() {
    const date = document.getElementById('attendanceDate').value;
    const classFilter = document.getElementById('attendanceClass').value;
    
    if (!date) {
        alert('Selecione uma data!');
        return;
    }
    
    // Filtrar alunos por turma
    let filteredStudents = students;
    if (classFilter) {
        filteredStudents = students.filter(s => s.id.startsWith(classFilter));
    }
    
    // Remover registros antigos desta data para estes alunos
    filteredStudents.forEach(student => {
        attendance = attendance.filter(a => !(a.studentId === student.id && a.date === date));
    });
    
    // Adicionar novos registros
    filteredStudents.forEach(student => {
        const radio = document.querySelector(`input[name="attendance_${student.id}"]:checked`);
        if (radio) {
            attendance.push({
                id: Date.now().toString() + '_' + student.id,
                studentId: student.id,
                date: date,
                status: radio.value
            });
        }
    });
    
    saveAttendance();
    alert('Chamada salva com sucesso!');
}

// Marcar todos como presentes
function selectAllPresent() {
    const radios = document.querySelectorAll('input[type="radio"][value="presente"]');
    radios.forEach(radio => {
        radio.checked = true;
    });
}

// Deletar nota
function deleteGrade(id) {
    if (confirm('Deseja realmente excluir esta nota?')) {
        grades = grades.filter(g => g.id !== id);
        saveGrades();
        updateGradesList();
    }
}

// Deletar frequência
function deleteAttendance(id) {
    if (confirm('Deseja realmente excluir este registro de frequência?')) {
        attendance = attendance.filter(a => a.id !== id);
        saveAttendance();
        updateAttendanceList();
    }
}

// Gerar relatório
function generateReport(studentId) {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    
    const studentGrades = grades.filter(g => g.studentId === studentId);
    const studentAttendance = attendance.filter(a => a.studentId === studentId);
    
    // Calcular médias por disciplina
    const subjects = {};
    studentGrades.forEach(grade => {
        if (!subjects[grade.subject]) {
            subjects[grade.subject] = [];
        }
        subjects[grade.subject].push(grade.value);
    });
    
    // Calcular frequência
    const totalDays = studentAttendance.length;
    const presentDays = studentAttendance.filter(a => a.status === 'presente').length;
    const absentDays = studentAttendance.filter(a => a.status === 'ausente').length;
    const lateDays = studentAttendance.filter(a => a.status === 'atrasado').length;
    const attendanceRate = totalDays > 0 ? (presentDays / totalDays * 100).toFixed(1) : 0;
    
    // Montar relatório
    let report = `RELATÓRIO ACADÊMICO\n\n`;
    report += `DADOS DO ALUNO\n`;
    report += `Nome: ${student.name}\n`;
    report += `Matrícula: ${student.id}\n\n`;
    report += `NOTAS POR DISCIPLINA\n`;
    
    if (Object.keys(subjects).length === 0) {
        report += 'Nenhuma nota registrada.\n';
    } else {
        Object.keys(subjects).forEach(subject => {
            const subjectGrades = subjects[subject];
            const average = subjectGrades.reduce((a, b) => a + b, 0) / subjectGrades.length;
            const status = average >= 7 ? 'APROVADO' : average >= 5 ? 'RECUPERAÇÃO' : 'REPROVADO';
            
            report += `\n${subject}:\n`;
            report += `  Média: ${average.toFixed(2)}\n`;
            report += `  Notas: ${subjectGrades.map(g => g.toFixed(1)).join(', ')}\n`;
            report += `  Status: ${status}\n`;
        });
    }
    
    report += `\nFREQUÊNCIA\n`;
    report += `Total de registros: ${totalDays}\n`;
    report += `Presentes: ${presentDays}\n`;
    report += `Ausentes: ${absentDays}\n`;
    report += `Atrasos: ${lateDays}\n`;
    report += `Frequência: ${attendanceRate}%\n`;
    
    if (parseFloat(attendanceRate) >= 75) {
        report += `Status: APROVADO EM FREQUÊNCIA\n`;
    } else {
        report += `Status: REPROVADO EM FREQUÊNCIA\n`;
    }
    
    report += `\nRelatório gerado em: ${new Date().toLocaleString('pt-BR')}\n`;
    
    // Exibir relatório
    const output = document.getElementById('reportOutput');
    output.innerHTML = `<pre>${report}</pre>`;
    
    // Estilizar relatório
    const pre = output.querySelector('pre');
    if (pre) {
        pre.style.color = '#1a1a1a';
        pre.style.fontFamily = "'Inter', sans-serif";
        pre.style.lineHeight = '1.8';
    }
}

// Efeito de digitação no console (opcional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

