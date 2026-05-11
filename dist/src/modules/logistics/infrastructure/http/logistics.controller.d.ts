import { LogisticsService } from '../../application/logistics.service';
import { DeliverOrderDto } from './dto/deliver-order.dto';
export declare class LogisticsController {
    private readonly logisticsService;
    constructor(logisticsService: LogisticsService);
    findPending(): Promise<import("../../domain/logistic.entity").Logistic[]>;
    findAll(): Promise<import("../../domain/logistic.entity").Logistic[]>;
    findOne(id: string): Promise<import("../../domain/logistic.entity").Logistic>;
    dispatch(id: string): Promise<import("../../domain/logistic.entity").Logistic>;
    deliver(id: string, dto: DeliverOrderDto): Promise<import("../../domain/logistic.entity").Logistic>;
}
