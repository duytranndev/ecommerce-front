export default function formatMoney(moneys: number) {
    let money: string = moneys + "";
    let format: string = '';
    for (let i = 0; i < money.length; i++) {
        if (i % 3 == 0 && i) {
            format = money[money.length - i - 1] + ',' + format;
        }
        else {
            format = money[money.length - i - 1] + format;
        }
    }
    return format + 'đ';
}