import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { OrderService } from "./order.service";

import { Injectable } from "@nestjs/common";

export class FakeOrderRepository {
    findMenuByMenuId(menuId: number, storeId: number) {
        if (storeId === 1 && menuId === 999) {
            return;
        }
        return { id: 1, foodName: "마라샹궈", price: 15000 };
    }

    createOrder(storeId: number, menuList) {
        return;
    }

    getOrderStatus(orderId: number) {
        if (orderId === 1) {
            return { id: 1, food: [{ id: 1, foodName: "마라샹궈", price: 15000 }], status: "주문 확정" };
        }
        if (orderId === 2) {
            return { id: 1, food: [{ id: 1, foodName: "마라샹궈", price: 15000 }], status: "배달 중" };
        }
        if (orderId === 3) {
            return { id: 1, food: [{ id: 1, foodName: "마라샹궈", price: 15000 }], status: "배달 완료" };
        }
        if (orderId === 4) {
            return { id: 1, food: [{ id: 1, foodName: "마라샹궈", price: 15000 }], status: "주문 접수" };
        }
        if (orderId === 999) {
            return;
        }
    }

    deleteOrder(orderId: number) {
        return;
    }
}

describe("OrderService", () => {
    let orderService: OrderService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OrderService, FakeOrderRepository],
        }).compile();

        orderService = module.get<OrderService>(OrderService);
    });

    it("should be defined", () => {
        expect(orderService).toBeDefined();
    });

    describe("validateOrderInfo()", () => {
        it("존재하지 않는 메뉴를 주문하였을 때 - 실패", async () => {
            const menuList = [
                { id: 1, foodName: "마라샹궈" },
                { id: 999, foodName: "콩" },
            ];
            const storeId = 1;
            await expect(orderService.validateOrderInfo(menuList, storeId)).rejects.toThrowError(new BadRequestException("존재하지 않는 메뉴입니다"));
        });

        it("메뉴를 10개 초과하여 주문하였을 때 - 실패", async () => {
            const storeId = 1;
            const menuList = [
                { id: 1, foodName: "마라샹궈", price: 15000 },
                { id: 2, foodName: "콩", price: 100 },
                { id: 3, foodName: "콩자반", price: 100 },
                { id: 4, foodName: "콩국수", price: 100 },
                { id: 5, foodName: "콩마라샹궈", price: 100 },
                { id: 6, foodName: "콩밥", price: 100 },
                { id: 7, foodName: "콩마라탕", price: 100 },
                { id: 8, foodName: "콩냉면", price: 100 },
                { id: 9, foodName: "콩두부", price: 100 },
                { id: 10, foodName: "콩고기", price: 100 },
                { id: 11, foodName: "콩싫어...", price: 100 },
            ];
            await expect(orderService.validateOrderInfo(menuList, storeId)).rejects.toThrowError(new BadRequestException("메뉴가 10개를 초과하였습니다"));
        });

        it("주문 검증을 통과한 경우 - 성공", async () => {
            const storeId = 1;
            const menuList = [
                { id: 1, foodName: "마라샹궈", price: 15000 },
                { id: 2, foodName: "마라탕", price: 10000 },
            ];
            const result = await orderService.validateOrderInfo(menuList, storeId);
            expect(result).toEqual(true);
        });
    });

    describe("createOrder()", () => {
        it("주문 검증에 실패한 경우 - 실패", async () => {
            const storeId = 1;
            const menuList = [
                { id: 1, foodName: "마라샹궈", price: 15000 },
                { id: 999, foodName: "콩", price: 100 },
            ];
            await expect(orderService.createOrder(storeId, menuList)).rejects.toThrowError(new BadRequestException("존재하지 않는 메뉴입니다"));
        });

        it("주문 검증에 성공한 경우 - 성공", async () => {
            const storeId = 1;
            const menuList = [
                { id: 1, foodName: "마라샹궈", price: 15000 },
                { id: 2, foodName: "마라탕", price: 10000 },
            ];
            const result = await orderService.createOrder(storeId, menuList);
            expect(result).toEqual(undefined);
        });
    });

    describe("checkOrderStatus_cancle", () => {
        it("주문 상태가 주문 확정일 경우 - 실패", () => {
            const orderStatus = "주문 확정";
            expect(() => {
                orderService.checkOrderStatus_cancle(orderStatus);
            }).toThrowError("주문 확정된 주문은 취소할 수 없습니다");
        });

        it("배달중인 주문은 취소할 수 없습니다 - 실패", () => {
            const orderStatus = "배달 중";
            expect(() => {
                orderService.checkOrderStatus_cancle(orderStatus);
            }).toThrowError("배달 중인 주문은 취소할 수 없습니다");
        });

        it("배달이 완료된 주문은 취소할 수 없습니다 - 실패", () => {
            const orderStatus = "배달 완료";
            expect(() => {
                orderService.checkOrderStatus_cancle(orderStatus);
            }).toThrowError("배달이 완료된 주문은 취소할 수 없습니다");
        });

        it("validation에 성공했을 경우", () => {
            const orderStatus = "주문 접수";
            const result = orderService.checkOrderStatus_cancle(orderStatus);
            expect(result).toEqual(true);
        });
    });

    describe("cancleOrder()", () => {
        it("주문 상태가 주문 접수 상태가 아닐 때 - 실패", async () => {
            const orderId_receive = 1;
            const orderId_on_delivery = 2;
            const orderId3_complete = 3;
            await expect(orderService.cancleOrder(orderId_receive)).rejects.toThrowError("주문 확정된 주문은 취소할 수 없습니다");
            await expect(orderService.cancleOrder(orderId_on_delivery)).rejects.toThrowError("배달 중인 주문은 취소할 수 없습니다");
            await expect(orderService.cancleOrder(orderId3_complete)).rejects.toThrowError("배달이 완료된 주문은 취소할 수 없습니다");
        });

        it("존재하지 않는 주문일 경우", async () => {
            const orderId = 999;
            await expect(orderService.cancleOrder(orderId)).rejects.toThrowError("존재하지 않는 주문입니다");
        });

        it("주문이 정상적으로 취소되었을 경우 - 성공", async () => {
            const orderId = 4;
            const result = await orderService.cancleOrder(orderId);
            expect(result).toBeNull;
        });
    });
});
