export default class TicketDTO {
    fromModel(model) {
        return {
            id: model.id,
            code: model.code,
            amount: model.amount,
            purcharser: model.purcharser,
        };
    }

    fromData(data) {
        return {
            id: data.id || null,
            amount: Number(model.amount),
            purcharser: model.purcharser.toLowerCase(),
        };
    }
}