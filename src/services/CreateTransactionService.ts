import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // compara o type
    /**
     * validação de tipos
     * comparação ultilizando o array
     */
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('transaction type is invalid ');
    }
    const { total } = this.transactionsRepository.getBalance();
    // buscando o total para verificação do valor do outcome
    if (type === 'outcome' && total < value) {
      throw new Error('You do not have enough balence');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
