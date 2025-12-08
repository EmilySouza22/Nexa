import moment from 'moment';
import 'moment/dist/locale/pt-br';

moment.locale('pt-br');

export function formatarData(dataISO) {
    return moment(dataISO).format('LLLL');
}