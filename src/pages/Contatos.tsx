import React, { useState, useEffect, useCallback } from 'react';
import './Contatos.css';

interface Cliente {
  id: string;
  beneficio: string;
  nome: string;
  sexo: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  ddb: string;
  nomeMae: string;
  especie: string;
  situacao: string;
  isPensaoAlimenticia: string;
  permiteEmprestimo: string;
  dib: string;
  bloqueadoEmprestimo: string;
  possuiRepresentanteLegal: string;
  telefone1: string;
  telefone2: string;
  telefone3: string;
  uf: string;
  cidade: string;
  bairro: string;
  endereco: string;
  cep: string;
  banco: string;
  agencia: string;
  conta: string;
  tipoConta: string;
  baseCalculo: string;
  mr: string;
  possuiCartaoRMC: string;
  possuiCartaoRCC: string;
  quantidadeEmprestimos: number;
  margemLivre35: string;
  margemCartaoRMC: string;
  margemCartaoRCC: string;
  ultimoContato: string;
  senhaINSS: string;
  contratosRMC: Array<{ banco: string; contrato: string; limiteCartao: string; inicioContrato: string; valorReservado: string }>;
  contratosRCC: Array<{ banco: string; contrato: string; limiteCartao: string; inicioContrato: string; valorReservado: string }>;
  contratos: Array<{ banco: string; contrato: string; valorEmprestimo: string; inicioDesconto: string; fimDesconto: string; emAbertoParcelas: string; valorParcela: string; dataAverbacao: string; taxa: string; saldoDevAprox: string }>;
}

interface Documento {
  nome: string;
  arquivo: File;
  autorizado: boolean;
}

interface Aniversariante {
  nome: string;
  data: string;
}

const Contatos: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({
    id: '',
    beneficio: '',
    nome: '',
    sexo: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    ddb: '',
    nomeMae: '',
    especie: '',
    situacao: '',
    isPensaoAlimenticia: 'NAO',
    permiteEmprestimo: 'SIM',
    dib: '',
    bloqueadoEmprestimo: 'NAO',
    possuiRepresentanteLegal: 'NAO',
    telefone1: '',
    telefone2: '',
    telefone3: '',
    uf: '',
    cidade: '',
    bairro: '',
    endereco: '',
    cep: '',
    banco: '',
    agencia: '',
    conta: '',
    tipoConta: '',
    baseCalculo: '',
    mr: '',
    possuiCartaoRMC: 'NAO',
    possuiCartaoRCC: 'NAO',
    quantidadeEmprestimos: 0,
    margemLivre35: '',
    margemCartaoRMC: '',
    margemCartaoRCC: '',
    ultimoContato: '',
    senhaINSS: '',
    contratosRMC: [],
    contratosRCC: [],
    contratos: []
  });

  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [novoDocNome, setNovoDocNome] = useState('');
  const [novoDocArquivo, setNovoDocArquivo] = useState<File | null>(null);
  const [isMaster, setIsMaster] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);
  const [aniversariantes, setAniversariantes] = useState<Aniversariante[]>([]);

  useEffect(() => {
    // Simula dados de aniversariantes do dia
    const hoje = new Date();
    const mesDia = `${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    const mock: Aniversariante[] = [
      { nome: 'Maria Silva', data: `15-05` },
      { nome: 'João Santos', data: `15-05` }
    ];
    const doDia = mock.filter(a => a.data === mesDia);
    setAniversariantes(doDia);
  }, []);

  const handleChange = useCallback((campo: keyof Cliente, valor: string | number) => {
    setCliente(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const handleAddDocumento = useCallback(() => {
    if (!novoDocNome.trim() || !novoDocArquivo) return;
    const novo: Documento = { nome: novoDocNome.trim(), arquivo: novoDocArquivo, autorizado: false };
    setDocumentos(prev => [...prev, novo]);
    setNovoDocNome('');
    setNovoDocArquivo(null);
  }, [novoDocNome, novoDocArquivo]);

  const handleDownload = useCallback((doc: Documento) => {
    if (!isMaster && !doc.autorizado) {
      // Simula solicitação de autorização
      const autorizar = window.confirm(`Solicitar autorização para baixar "${doc.nome}"? O master precisa aprovar.`);
      if (autorizar) {
        setDocumentos(prev => prev.map(d => d === doc ? { ...d, autorizado: true } : d));
      }
      return;
    }
    // Simula download (cria URL do objeto)
    const url = URL.createObjectURL(doc.arquivo);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.arquivo.name;
    a.click();
    URL.revokeObjectURL(url);
  }, [isMaster]);

  const handleSearch = useCallback((termo: string) => {
    console.log('Buscar:', termo);
    // Lógica de busca futura
  }, []);

  return (
    <div className="contatos-container">
      <div className="header">
        <div className="logo-area">
          <div className="logo-icon">K</div>
          <span className="logo-text">Agência KS</span>
        </div>
        <div className="user-area">
          <span className="user-email">elielsonadm@ks.com</span>
          <button className="btn-sair">Sair</button>
        </div>
      </div>

      <div className="card-principal">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Digite CPF, Nome, Benefício..."
            onKeyDown={(e) => e.key === 'Enter' && handleSearch((e.target as HTMLInputElement).value)}
          />
          <button className="btn-buscar">Buscar</button>
        </div>

        <div className="action-bar">
          <div className="birthday-wrapper">
            <button className="btn-escuro btn-birthday" onClick={() => setShowBirthday(!showBirthday)}>
              Aniversariantes
            </button>
            {showBirthday && (
              <div className="birthday-balloon">
                <h4>Aniversariantes do dia</h4>
                {aniversariantes.length === 0 ? (
                  <p style={{ color: '#666', fontSize: 14 }}>Nenhum aniversariante hoje</p>
                ) : (
                  <ul>
                    {aniversariantes.map((a, i) => (
                      <li key={i}>{a.nome}</li>
                    ))}
                  </ul>
                )}
                <button className="btn-fechar" onClick={() => setShowBirthday(false)}>Fechar</button>
              </div>
            )}
          </div>
          <button className="btn-escuro" onClick={() => setCliente({ ...cliente, id: '' })}>
            Novo Contato
          </button>
          <button className="btn-escuro" onClick={() => console.log('Exportar PDF')}>Exportar PDF</button>
        </div>

        <div className="master-toggle">
          <label>
            <input type="checkbox" checked={isMaster} onChange={() => setIsMaster(!isMaster)} />
            Sou Master
          </label>
        </div>

        <div className="formulario">
          {/* Dados Cadastrais */}
          <div className="secao">
            <h3 className="secao-titulo">Dados Cadastrais</h3>
            <div className="grid-4">
              <div className="campo">
                <label>Benefício</label>
                <input type="text" value={cliente.beneficio} onChange={(e) => handleChange('beneficio', e.target.value)} />
              </div>
              <div className="campo">
                <label>Nome</label>
                <input type="text" value={cliente.nome} onChange={(e) => handleChange('nome', e.target.value)} />
              </div>
              <div className="campo">
                <label>Sexo</label>
                <input type="text" value={cliente.sexo} onChange={(e) => handleChange('sexo', e.target.value)} />
              </div>
              <div className="campo">
                <label>CPF</label>
                <input type="text" value={cliente.cpf} onChange={(e) => handleChange('cpf', e.target.value)} />
              </div>
            </div>
            <div className="grid-4">
              <div className="campo">
                <label>RG</label>
                <input type="text" value={cliente.rg} onChange={(e) => handleChange('rg', e.target.value)} />
              </div>
              <div className="campo">
                <label>Data Nascimento</label>
                <input type="text" value={cliente.dataNascimento} onChange={(e) => handleChange('dataNascimento', e.target.value)} />
              </div>
              <div className="campo">
                <label>DDB</label>
                <input type="text" value={cliente.ddb} onChange={(e) => handleChange('ddb', e.target.value)} />
              </div>
              <div className="campo">
                <label>Nome Mãe</label>
                <input type="text" value={cliente.nomeMae} onChange={(e) => handleChange('nomeMae', e.target.value)} />
              </div>
            </div>
            <div className="grid-3">
              <div className="campo">
                <label>Espécie</label>
                <input type="text" value={cliente.especie} onChange={(e) => handleChange('especie', e.target.value)} />
              </div>
              <div className="campo">
                <label>Situação</label>
                <input type="text" value={cliente.situacao} onChange={(e) => handleChange('situacao', e.target.value)} />
              </div>
              <div className="campo">
                <label>É pensão alimentícia?</label>
                <select value={cliente.isPensaoAlimenticia} onChange={(e) => handleChange('isPensaoAlimenticia', e.target.value)}>
                  <option value="SIM">SIM</option>
                  <option value="NAO">NÃO</option>
                </select>
              </div>
            </div>
            <div className="grid-3">
              <div className="campo">
                <label>Permite Empréstimo</label>
                <select value={cliente.permiteEmprestimo} onChange={(e) => handleChange('permiteEmprestimo', e.target.value)}>
                  <option value="SIM">SIM</option>
                  <option value="NAO">NÃO</option>
                </select>
              </div>
              <div className="campo">
                <label>DIB</label>
                <input type="text" value={cliente.dib} onChange={(e) => handleChange('dib', e.target.value)} />
              </div>
              <div className="campo">
                <label>Bloqueado Empréstimo</label>
                <select value={cliente.bloqueadoEmprestimo} onChange={(e) => handleChange('bloqueadoEmprestimo', e.target.value)}>
                  <option value="SIM">SIM</option>
                  <option value="NAO">NÃO</option>
                </select>
              </div>
            </div>
            <div className="grid-2">
              <div className="campo">
                <label>Possui representante legal</label>
                <select value={cliente.possuiRepresentanteLegal} onChange={(e) => handleChange('possuiRepresentanteLegal', e.target.value)}>
                  <option value="SIM">SIM</option>
                  <option value="NAO">NÃO</option>
                </select>
              </div>
            </div>
          </div>

          {/* Telefones */}
          <div className="secao">
            <h3 className="secao-titulo">Telefones</h3>
            <div className="grid-3">
              <div className="campo">
                <label>Telefone 1</label>
                <input type="text" value={cliente.telefone1} onChange={(e) => handleChange('telefone1', e.target.value)} />
              </div>
              <div className="campo">
                <label>Telefone 2</label>
                <input type="text" value={cliente.telefone2} onChange={(e) => handleChange('telefone2', e.target.value)} />
              </div>
              <div className="campo">
                <label>Telefone 3</label>
                <input type="text" value={cliente.telefone3} onChange={(e) => handleChange('telefone3', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Endereços do Cliente */}
          <div className="secao">
            <h3 className="secao-titulo">Endereços do Cliente</h3>
            <div className="grid-5">
              <div className="campo"><label>CEP</label><input type="text" value={cliente.cep} onChange={(e) => handleChange('cep', e.target.value)} /></div>
              <div className="campo"><label>Endereço</label><input type="text" value={cliente.endereco} onChange={(e) => handleChange('endereco', e.target.value)} /></div>
              <div className="campo"><label>Bairro</label><input type="text" value={cliente.bairro} onChange={(e) => handleChange('bairro', e.target.value)} /></div>
              <div className="campo"><label>Cidade</label><input type="text" value={cliente.cidade} onChange={(e) => handleChange('cidade', e.target.value)} /></div>
              <div className="campo"><label>UF</label><input type="text" value={cliente.uf} onChange={(e) => handleChange('uf', e.target.value)} /></div>
            </div>
          </div>

          {/* Dados Bancários */}
          <div className="secao">
            <h3 className="secao-titulo">Dados Bancários</h3>
            <div className="grid-4">
              <div className="campo"><label>Banco</label><input type="text" value={cliente.banco} onChange={(e) => handleChange('banco', e.target.value)} /></div>
              <div className="campo"><label>Agência</label><input type="text" value={cliente.agencia} onChange={(e) => handleChange('agencia', e.target.value)} /></div>
              <div className="campo"><label>Conta</label><input type="text" value={cliente.conta} onChange={(e) => handleChange('conta', e.target.value)} /></div>
              <div className="campo">
                <label>Tipo de conta</label>
                <select value={cliente.tipoConta} onChange={(e) => handleChange('tipoConta', e.target.value)}>
                  <option value="">Selecione</option>
                  <option value="CORRENTE">Corrente</option>
                  <option value="POUPANCA">Poupança</option>
                  <option value="SALARIO">Salário</option>
                </select>
              </div>
            </div>
          </div>

          {/* Margens */}
          <div className="secao">
            <h3 className="secao-titulo">Margens</h3>
            <div className="grid-4">
              <div className="campo"><label>Base de cálculo</label><input type="text" value={cliente.baseCalculo} onChange={(e) => handleChange('baseCalculo', e.target.value)} /></div>
              <div className="campo"><label>MR</label><input type="text" value={cliente.mr} onChange={(e) => handleChange('mr', e.target.value)} /></div>
              <div className="campo">
                <label>Possui Cartão RMC</label>
                <select value={cliente.possuiCartaoRMC} onChange={(e) => handleChange('possuiCartaoRMC', e.target.value)}>
                  <option value="SIM">SIM</option>
                  <option value="NAO">NÃO</option>
                </select>
              </div>
              <div className="campo">
                <label>Possui Cartão RCC</label>
                <select value={cliente.possuiCartaoRCC} onChange={(e) => handleChange('possuiCartaoRCC', e.target.value)}>
                  <option value="SIM">SIM</option>
                  <option value="NAO">NÃO</option>
                </select>
              </div>
            </div>
            <div className="grid-4">
              <div className="campo"><label>Qtd Empréstimos</label><input type="number" value={cliente.quantidadeEmprestimos} onChange={(e) => handleChange('quantidadeEmprestimos', Number(e.target.value))} /></div>
              <div className="campo"><label>Margem Livre 35%</label><input type="text" value={cliente.margemLivre35} onChange={(e) => handleChange('margemLivre35', e.target.value)} /></div>
              <div className="campo"><label>Margem Cartão RMC</label><input type="text" value={cliente.margemCartaoRMC} onChange={(e) => handleChange('margemCartaoRMC', e.target.value)} /></div>
              <div className="campo"><label>Margem Cartão RCC</label><input type="text" value={cliente.margemCartaoRCC} onChange={(e) => handleChange('margemCartaoRCC', e.target.value)} /></div>
            </div>
            <div className="grid-2">
              <div className="campo"><label>Último Contato</label><input type="text" value={cliente.ultimoContato} onChange={(e) => handleChange('ultimoContato', e.target.value)} /></div>
              <div className="campo"><label>Senha INSS</label><input type="password" value={cliente.senhaINSS} onChange={(e) => handleChange('senhaINSS', e.target.value)} /></div>
            </div>
          </div>

          {/* Seção de Documentos (Anexos) */}
          <div className="secao">
            <h3 className="secao-titulo">Documentos</h3>
            <div className="grid-3">
              <div className="campo">
                <label>Nome do documento</label>
                <input type="text" placeholder="Ex: RG, CPF, Comprovante..." value={novoDocNome} onChange={(e) => setNovoDocNome(e.target.value)} />
              </div>
              <div className="campo">
                <label>Selecionar arquivo</label>
                <input type="file" onChange={(e) => { const file = e.target.files?.[0] || null; setNovoDocArquivo(file); }} />
              </div>
              <div className="campo campo-botao">
                <button className="btn-adicionar" onClick={handleAddDocumento}>+ Adicionar Documento</button>
              </div>
            </div>
            {documentos.length > 0 && (
              <table className="tabela-contratos tabela-documentos" style={{ marginTop: 16 }}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Arquivo</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {documentos.map((doc, index) => (
                    <tr key={index}>
                      <td>{doc.nome}</td>
                      <td>{doc.arquivo.name}</td>
                      <td>
                        <button className="btn-download" onClick={() => handleDownload(doc)}>
                          {isMaster ? 'Baixar' : doc.autorizado ? 'Baixar (autorizado)' : 'Solicitar Download'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Contrato Cartão RMC */}
          <div className="secao">
            <h3 className="secao-titulo">Contrato Cartão RMC</h3>
            <table className="tabela-contratos">
              <thead>
                <tr>
                  <th>Banco</th>
                  <th>Contrato</th>
                  <th>Limite Cartão</th>
                  <th>Início Contrato</th>
                  <th>Valor Reservado</th>
                </tr>
              </thead>
              <tbody>
                {cliente.contratosRMC.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>Nenhum contrato RMC cadastrado</td></tr>
                ) : (
                  cliente.contratosRMC.map((cartao, index) => (
                    <tr key={index}>
                      <td>{cartao.banco}</td>
                      <td>{cartao.contrato}</td>
                      <td>{cartao.limiteCartao}</td>
                      <td>{cartao.inicioContrato}</td>
                      <td>{cartao.valorReservado}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Contrato Cartão RCC */}
          <div className="secao">
            <h3 className="secao-titulo">Contrato Cartão RCC</h3>
            <table className="tabela-contratos">
              <thead>
                <tr>
                  <th>Banco</th>
                  <th>Contrato</th>
                  <th>Limite Cartão</th>
                  <th>Início Contrato</th>
                  <th>Valor Reservado</th>
                </tr>
              </thead>
              <tbody>
                {cliente.contratosRCC.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>Nenhum contrato RCC cadastrado</td></tr>
                ) : (
                  cliente.contratosRCC.map((cartao, index) => (
                    <tr key={index}>
                      <td>{cartao.banco}</td>
                      <td>{cartao.contrato}</td>
                      <td>{cartao.limiteCartao}</td>
                      <td>{cartao.inicioContrato}</td>
                      <td>{cartao.valorReservado}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Contratos */}
          <div className="secao">
            <h3 className="secao-titulo">Contratos</h3>
            <table className="tabela-contratos">
              <thead>
                <tr>
                  <th>Banco</th>
                  <th>Contrato</th>
                  <th>Valor Empréstimo</th>
                  <th>Início Desconto</th>
                  <th>Fim Desconto</th>
                  <th>Parcelas</th>
                  <th>Valor Parcela</th>
                  <th>Data Averbação</th>
                  <th>Taxa</th>
                  <th>Saldo Devedor</th>
                </tr>
              </thead>
              <tbody>
                {cliente.contratos.length === 0 ? (
                  <tr><td colSpan={10} style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>Nenhum contrato cadastrado</td></tr>
                ) : (
                  cliente.contratos.map((contrato, index) => (
                    <tr key={index}>
                      <td>{contrato.banco}</td>
                      <td>{contrato.contrato}</td>
                      <td>{contrato.valorEmprestimo}</td>
                      <td>{contrato.inicioDesconto}</td>
                      <td>{contrato.fimDesconto}</td>
                      <td>{contrato.emAbertoParcelas}</td>
                      <td>{contrato.valorParcela}</td>
                      <td>{contrato.dataAverbacao}</td>
                      <td>{contrato.taxa}</td>
                      <td>{contrato.saldoDevAprox}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="btn-salvar-area">
            <button className="btn-salvar">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contatos;