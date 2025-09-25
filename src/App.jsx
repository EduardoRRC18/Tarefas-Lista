import { useState } from 'react'
import './App.css'

function App() {
  // useState para guardar a lista de tarefas
  const [tarefas, setTarefas] = useState([])
  // useState para guardar o texto que o usuário está digitando
  const [novaTarefa, setNovaTarefa] = useState('')
  
  // Função para pegar a data atual formatada
  const obterDataAtual = () => {
    const hoje = new Date()
    const opcoes = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return hoje.toLocaleDateString('pt-BR', opcoes)
  }
  
  // Função para obter horário atual
  const obterHorario = () => {
    const agora = new Date()
    return agora.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  // Função para adicionar nova tarefa
  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      // Cria  objeto para cada tarefa com texto, status e horário
      const tarefaObj = {
        texto: novaTarefa,
        concluida: false,
        horario: obterHorario()
      }
      setTarefas([...tarefas, tarefaObj])
      setNovaTarefa('')
    }
  }

  // Função para deletar tarefa pelo índice
  const deletarTarefa = (indexParaDeletar) => {
    const novasTarefas = tarefas.filter((tarefa, index) => index !== indexParaDeletar)
    setTarefas(novasTarefas)
  }

  // Função para alternar status de concluída
  const alternarConcluida = (indexParaAlterar) => {
    const novasTarefas = tarefas.map((tarefa, index) => {
      if (index === indexParaAlterar) {
        return { ...tarefa, concluida: !tarefa.concluida }
      }
      return tarefa
    })
    setTarefas(novasTarefas)
  }

  return (
    <div className="app">
      {/* Header do app */}
      <div className="header">
        <h1>Today's Schedule</h1>
        <p className="data-atual">{obterDataAtual()}</p>
      </div>
      
      {/* Barra de calendário  */}
      <div className="calendario-barra">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia, index) => (
          <div key={index} className={`dia ${index === new Date().getDay() ? 'hoje' : ''}`}>
            <span className="dia-semana">{dia}</span>
            <span className="dia-numero">{new Date(Date.now() + (index - new Date().getDay()) * 24 * 60 * 60 * 1000).getDate()}</span>
          </div>
        ))}
      </div>

      {/* Lista de tarefas */}
      <div className="tarefas-container">
        {tarefas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>Nenhum compromisso agendado</p>
            <span>Adicione seu primeiro compromisso</span>
          </div>
        ) : (
          <div className="tarefas-lista">
            {tarefas.map((tarefa, index) => (
              <div key={index} className={`tarefa-card ${tarefa.concluida ? 'concluida' : ''}`}>
                <div className="horario">{tarefa.horario}</div>
                <div className="tarefa-info">
                  <h3>{tarefa.texto}</h3>
                  <span className="status">{tarefa.concluida ? 'Concluído' : 'Pendente'}</span>
                </div>
                <div className="tarefa-acoes">
                  <button 
                    className="btn-check"
                    onClick={() => alternarConcluida(index)}
                    title={tarefa.concluida ? 'Marcar como pendente' : 'Marcar como concluído'}
                  >
                    {tarefa.concluida ? '✓' : '○'}
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => deletarTarefa(index)}
                    title="Excluir compromisso"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input para nova tarefa (inicialmente ele fica oculto) */}
      <div className="input-modal" id="inputModal" style={{display: 'none'}}>
        <div className="input-content">
          <h3>Novo Compromisso</h3>
          <input 
            type="text" 
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Descreva seu compromisso..."
            onKeyPress={(e) => e.key === 'Enter' && adicionarTarefa()}
          />
          <div className="input-acoes">
            <button onClick={() => document.getElementById('inputModal').style.display = 'none'}>Cancelar</button>
            <button onClick={adicionarTarefa} className="btn-primary">Adicionar</button>
          </div>
        </div>
      </div>

      {/* Botão flutuante para adicionar nova tarefa*/}
      <button 
        className="fab"
        onClick={() => document.getElementById('inputModal').style.display = 'flex'}
        title="Adicionar novo compromisso"
      >
        +
      </button>
    </div>
  )
}

export default App
