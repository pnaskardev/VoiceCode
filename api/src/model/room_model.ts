import { getModelForClass, modelOptions, Severity, prop} from "@typegoose/typegoose";

@modelOptions({
    schemaOptions:
    {
        timestamps:true
    },
    options:
    {
        allowMixed:Severity.ALLOW
    }
})

export class Room {
    @prop({ required: true })
        title: string;
  
    @prop({ required: false })
        body?: string;
  
    @prop({ required: false })
        input?: string;
  
    @prop({ required: false })
        language?: string;
}
  

const RoomDataModel=getModelForClass(Room);

export default RoomDataModel ;
