import { Document, Model } from "mongoose"

export abstract class MongoUpdateOperationAbstract<
    TDocument extends Document,
> {
    constructor(
       protected model: Model<TDocument>,
    ) {}

    protected async updateMany(conditions: Partial<Partial<TDocument>>, objectToUpload: Partial<Partial<TDocument>>): Promise<void> {
        const fieldsFromDocumentExisting = this.serializeObjectToUpload(objectToUpload)
        const conditionsObject = this.serializeCondition(conditions)

        await this.model.updateMany({
            ...conditionsObject,
            ...fieldsFromDocumentExisting,
        }, {
            $set: objectToUpload,
        }).exec()
    }

    protected async updateOne(conditions: Partial<Partial<TDocument>>, objectToUpload: Partial<Partial<TDocument>>): Promise<void> {
        const fieldsFromDocumentExisting = this.serializeObjectToUpload(objectToUpload)
        const conditionsObject = this.serializeCondition(conditions)

        await this.model.updateOne({
            ...conditionsObject,
            ...fieldsFromDocumentExisting,
        }, {
            $set: objectToUpload,
        }).exec()
    }

    // Use when you want that your conditions key exist
    private serializeCondition(conditions: Partial<Partial<TDocument>>) {
        const conditionsObject = {}
        for (const [ key, value ] of Object.entries(conditions)) {
            conditionsObject[key] = { $exists: true, $eq: value }
        }
        return conditionsObject
    }

    // Serialize object to upload in order to check if value exist (avoid to upload a non existing field)
    private serializeObjectToUpload(objectToUpload: Partial<Partial<TDocument>>) {
        const fieldsFromDocumentExisting = {}
        for (const [ key ] of Object.entries(objectToUpload)) {
            fieldsFromDocumentExisting[key] = { $exists: true }
        }
        return fieldsFromDocumentExisting
    }

}
