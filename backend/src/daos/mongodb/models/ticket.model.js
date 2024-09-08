/* eslint-disable camelcase */
import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { generateNumber } from "../../../utils/random.js";

const ticketCollection = "tickets";

const ticketSchema = new Schema({
    code: { type: Number, unique: true, required: true },
    purchase_datetime: { type: Date, require: true },
    amount: { type: Number, min: 10, max: 100000, required: true },
    purcharser: { type: String, require: true },
}, { versionKey: false });

ticketSchema.pre("save", function(next){
    if(!this.code){
        this.code = generateNumber(1000, 9999);
    }

    if(!this.purchase_datetime){
        this.purchase_datetime = Date.now();
    }
    next();
});

ticketSchema.plugin(paginate);

const TicketModel = model(ticketCollection, ticketSchema);

export default TicketModel;