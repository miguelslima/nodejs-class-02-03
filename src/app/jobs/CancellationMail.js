import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const {appointmant} = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${appointmant.provider.name} <${appointmant.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointmant.provider.name,
        user: appointmant.user.name,
        date: format(
          parseISO(appointmant.date),
          "'dia' dd 'de' MMMM', as' H:MM'h'",
          { locale: pt}
        ),
      },
    });
  }
}

export default new CancellationMail();
