import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransacitonDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    // duvida em como usa o reduce

    const { income, outcome } = this.transactions.reduce(
      (accumulador: Balance, transaction: Transaction) => {
        // incrementando os valores que estão vindo e saindo da aplicação,
        // pelo type transaction/ separate for type for sum values.
        switch (transaction.type) {
          case 'income':
            // eslint-disable-next-line no-param-reassign
            accumulador.income += transaction.value;
            break;
          case 'outcome':
            // eslint-disable-next-line no-param-reassign
            accumulador.outcome += transaction.value;
            break;
          default:
            break;
        }
        return accumulador;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransacitonDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
