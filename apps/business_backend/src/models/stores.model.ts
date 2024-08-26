import { model, Schema, Document } from "mongoose";
import { Store } from "@interfaces/models.interface";

const storeSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
    domain: {
        type: String,
    },
    subdomain: {
        type: String,
        required: true,
        unique: true,
    },
    plan: {
        type: Schema.Types.ObjectId,
        ref: "Plan",
    },
    addresses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Address",
        },
    ],
    creationDate: {
        type: Date,
    },
    trialExpirationDate: {
        type: Date,
    },
    description: {
        type: String,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    image: {
        type: String,
    },
});

const storeModel = model<Store & Document>("Store", storeSchema);

export default storeModel;
