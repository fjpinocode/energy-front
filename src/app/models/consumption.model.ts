export class Consumption {
    constructor(
        public id?: any,
        public cups?: string,
        public date?: Date,
        public hour?: number,
        public consumption?: number,
        public obtainingMethod: 'R' | 'E' = 'R',
        public dateFormat?: string
    ) {}

    static fromJson(item: any): Consumption {
        const consumption = new Consumption();
        consumption.id = item._id;
        consumption.cups = item.cups;
        consumption.date = new Date(item.date);
        consumption.dateFormat = consumption.date.getDate() + '/' + consumption.date.getMonth() + '/' + consumption.date.getFullYear();
        consumption.hour = Number(item.hour);
        consumption.consumption = Number(item.consumption);
        consumption.obtainingMethod = item.obtainingMethod;
        return consumption;
    }

    getFormatDate(): string {
        return this.date.getDate() + '/' + (this.date.getMonth() + 1) + '/' + this.date.getFullYear();
    }
}
