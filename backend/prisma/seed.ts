import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed do banco de dados...\n');

  // Limpar dados existentes
  await prisma.transaction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();

  // Criar contas
  console.log('Criando contas...');
  const contaCorrente = await prisma.account.create({
    data: {
      name: 'Conta Corrente',
      type: 'corrente',
      bank: 'Banco do Brasil',
      initialBalance: 5000,
      currentBalance: 5000,
      color: '#3B82F6',
      icon: 'building-2',
    },
  });

  const poupanca = await prisma.account.create({
    data: {
      name: 'Poupança',
      type: 'poupanca',
      bank: 'Caixa Econômica',
      initialBalance: 10000,
      currentBalance: 10000,
      color: '#10B981',
      icon: 'piggy-bank',
    },
  });

  const carteira = await prisma.account.create({
    data: {
      name: 'Carteira',
      type: 'carteira',
      initialBalance: 500,
      currentBalance: 500,
      color: '#F59E0B',
      icon: 'wallet',
    },
  });

  console.log(`${3} contas criadas\n`);

  // Criar categorias de DESPESA
  console.log('Criando categorias...');
  const alimentacao = await prisma.category.create({
    data: {
      name: 'Alimentação',
      type: 'despesa',
      icon: 'utensils',
      color: '#EF4444',
    },
  });

  const transporte = await prisma.category.create({
    data: {
      name: 'Transporte',
      type: 'despesa',
      icon: 'car',
      color: '#F59E0B',
    },
  });

  const moradia = await prisma.category.create({
    data: {
      name: 'Moradia',
      type: 'despesa',
      icon: 'home',
      color: '#8B5CF6',
    },
  });

  const lazer = await prisma.category.create({
    data: {
      name: 'Lazer',
      type: 'despesa',
      icon: 'gamepad-2',
      color: '#EC4899',
    },
  });

  const saude = await prisma.category.create({
    data: {
      name: 'Saúde',
      type: 'despesa',
      icon: 'heart-pulse',
      color: '#06B6D4',
    },
  });

  // Criar categorias de RECEITA
  const salario = await prisma.category.create({
    data: {
      name: 'Salário',
      type: 'receita',
      icon: 'banknote',
      color: '#10B981',
    },
  });

  const freelance = await prisma.category.create({
    data: {
      name: 'Freelance',
      type: 'receita',
      icon: 'laptop',
      color: '#3B82F6',
    },
  });

  const investimentos = await prisma.category.create({
    data: {
      name: 'Investimentos',
      type: 'receita',
      icon: 'trending-up',
      color: '#14B8A6',
    },
  });

  const vendas = await prisma.category.create({
    data: {
      name: 'Vendas',
      type: 'receita',
      icon: 'shopping-bag',
      color: '#8B5CF6',
    },
  });

  const bonus = await prisma.category.create({
    data: {
      name: 'Bônus',
      type: 'receita',
      icon: 'gift',
      color: '#F59E0B',
    },
  });

  console.log(`${10} categorias criadas\n`);

  // Criar transações dos últimos 2 meses
  console.log('Criando transações...');

  const now = new Date();
  const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

  const transactions = [
    // Mês passado - Receitas
    {
      type: 'receita',
      amount: 5000,
      date: new Date(now.getFullYear(), now.getMonth() - 1, 5),
      description: 'Salário de novembro',
      categoryId: salario.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'receita',
      amount: 1500,
      date: new Date(now.getFullYear(), now.getMonth() - 1, 10),
      description: 'Projeto freelance',
      categoryId: freelance.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'receita',
      amount: 200,
      date: new Date(now.getFullYear(), now.getMonth() - 1, 15),
      description: 'Rendimento poupança',
      categoryId: investimentos.id,
      accountId: poupanca.id,
      status: 'confirmada',
    },

    // Mês passado - Despesas
    {
      type: 'despesa',
      amount: 1200,
      date: new Date(now.getFullYear(), now.getMonth() - 1, 7),
      description: 'Aluguel',
      categoryId: moradia.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'despesa',
      amount: 350,
      date: new Date(now.getFullYear(), now.getMonth() - 1, 8),
      description: 'Supermercado',
      categoryId: alimentacao.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'despesa',
      amount: 150,
      date: new Date(now.getFullYear(), now.getMonth() - 1, 12),
      description: 'Uber',
      categoryId: transporte.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'despesa',
      amount: 80,
      date: new Date(now.getFullYear(), now.getMonth() - 1, 14),
      description: 'Cinema',
      categoryId: lazer.id,
      accountId: carteira.id,
      status: 'confirmada',
    },
    {
      type: 'despesa',
      amount: 200,
      date: new Date(now.getFullYear(), now.getMonth() - 1, 18),
      description: 'Farmácia',
      categoryId: saude.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'despesa',
      amount: 120,
      date: new Date(now.getFullYear(), now.getMonth() - 1, 20),
      description: 'Restaurante',
      categoryId: alimentacao.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'despesa',
      amount: 90,
      date: new Date(now.getFullYear(), now.getMonth() - 1, 25),
      description: 'Gasolina',
      categoryId: transporte.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },

    // Mês atual - Receitas
    {
      type: 'receita',
      amount: 5000,
      date: new Date(now.getFullYear(), now.getMonth(), 5),
      description: 'Salário de dezembro',
      categoryId: salario.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'receita',
      amount: 800,
      date: new Date(now.getFullYear(), now.getMonth(), 12),
      description: 'Consultoria',
      categoryId: freelance.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'receita',
      amount: 500,
      date: new Date(now.getFullYear(), now.getMonth(), 20),
      description: 'Bônus de fim de ano',
      categoryId: bonus.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },

    // Mês atual - Despesas
    {
      type: 'despesa',
      amount: 1200,
      date: new Date(now.getFullYear(), now.getMonth(), 7),
      description: 'Aluguel',
      categoryId: moradia.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'despesa',
      amount: 400,
      date: new Date(now.getFullYear(), now.getMonth(), 9),
      description: 'Supermercado',
      categoryId: alimentacao.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'despesa',
      amount: 180,
      date: new Date(now.getFullYear(), now.getMonth(), 11),
      description: 'Uber e transporte',
      categoryId: transporte.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'despesa',
      amount: 250,
      date: new Date(now.getFullYear(), now.getMonth(), 15),
      description: 'Shows e eventos',
      categoryId: lazer.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'despesa',
      amount: 150,
      date: new Date(now.getFullYear(), now.getMonth(), 18),
      description: 'Academia',
      categoryId: saude.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },
    {
      type: 'despesa',
      amount: 90,
      date: new Date(now.getFullYear(), now.getMonth(), 22),
      description: 'Lanche',
      categoryId: alimentacao.id,
      accountId: carteira.id,
      status: 'confirmada',
    },
    {
      type: 'despesa',
      amount: 60,
      date: new Date(now.getFullYear(), now.getMonth(), 28),
      description: 'Streaming',
      categoryId: lazer.id,
      accountId: contaCorrente.id,
      status: 'confirmada',
    },

    // Transações pendentes (futuras)
    {
      type: 'despesa',
      amount: 200,
      date: new Date(now.getFullYear(), now.getMonth() + 1, 5),
      description: 'Conta de luz (prevista)',
      categoryId: moradia.id,
      accountId: contaCorrente.id,
      status: 'pendente',
    },
    {
      type: 'receita',
      amount: 5000,
      date: new Date(now.getFullYear(), now.getMonth() + 1, 5),
      description: 'Salário (próximo mês)',
      categoryId: salario.id,
      accountId: contaCorrente.id,
      status: 'pendente',
    },
  ];

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    });
  }

  console.log(`${transactions.length} transações criadas\n`);

  // Atualizar saldos das contas baseado nas transações confirmadas
  const allTransactions = await prisma.transaction.findMany({
    where: { status: 'confirmada' },
  });

  const accountBalances = new Map<string, number>();
  accountBalances.set(contaCorrente.id, contaCorrente.initialBalance);
  accountBalances.set(poupanca.id, poupanca.initialBalance);
  accountBalances.set(carteira.id, carteira.initialBalance);

  for (const t of allTransactions) {
    const currentBalance = accountBalances.get(t.accountId) || 0;
    const newBalance =
      t.type === 'receita' ? currentBalance + t.amount : currentBalance - t.amount;
    accountBalances.set(t.accountId, newBalance);
  }

  for (const [accountId, balance] of accountBalances.entries()) {
    await prisma.account.update({
      where: { id: accountId },
      data: { currentBalance: balance },
    });
  }

  console.log('Saldos das contas atualizados\n');

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
