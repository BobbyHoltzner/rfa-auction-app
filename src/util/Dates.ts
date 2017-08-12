const getExpireDateForGroup = (group: number) => {
    switch (group) {
        case 1:
            return new Date("Aug 10, 2017 00:00:00").getTime();
        case 2:
            return new Date("Aug 11, 2017 00:00:00").getTime();
        case 3:
            return new Date("Aug 12, 2017 00:00:00").getTime();
        case 4:
            return new Date("Aug 13, 2017 00:00:00").getTime();
        case 5:
            return new Date("Aug 14, 2017 00:00:00").getTime();
        case 6:
            return new Date("Aug 15, 2017 00:00:00").getTime();
        case 7:
            return new Date("Aug 16, 2017 00:00:00").getTime();
        default:
            // Nothing
    }
};

export {getExpireDateForGroup};