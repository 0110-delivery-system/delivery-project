import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { OrderService } from "./order.service";

import { Injectable } from "@nestjs/common";

export class FakeOrderRepository {
    findMenuByMenuId(menuId: number, storeId: number) {
        if (storeId === 1 && menuId === 999) {
            return;
        }
        return { id: 1, foodName: "마라샹궈" };
    }

    createOrder(storeId: number, menuList) {
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
                { id: 1, foodName: "마라샹궈" },
                { id: 2, foodName: "콩" },
                { id: 3, foodName: "콩자반" },
                { id: 4, foodName: "콩국수" },
                { id: 5, foodName: "콩마라샹궈" },
                { id: 6, foodName: "콩밥" },
                { id: 7, foodName: "콩마라탕" },
                { id: 8, foodName: "콩냉면" },
                { id: 9, foodName: "콩두부" },
                { id: 10, foodName: "콩고기" },
                { id: 11, foodName: "콩..." },
            ];
            await expect(orderService.validateOrderInfo(menuList, storeId)).rejects.toThrowError(new BadRequestException("메뉴가 10개를 초과하였습니다"));
        });

        it("주문 검증을 통과한 경우 - 성공", async () => {
            const storeId = 1;
            const menuList = [
                { id: 1, foodName: "마라샹궈" },
                { id: 2, foodName: "마라탕" },
            ];
            const result = await orderService.validateOrderInfo(menuList, storeId);
            expect(result).toEqual(true);
        });
    });

    describe("createOrder()", () => {
        it("주문 검증에 실패한 경우 - 실패", async () => {
            const storeId = 1;
            const menuList = [
                { id: 1, foodName: "마라샹궈" },
                { id: 999, foodName: "콩" },
            ];
            await expect(orderService.createOrder(storeId, menuList)).rejects.toThrowError(new BadRequestException("존재하지 않는 메뉴입니다"));
        });

        it("주문 검증에 성공한 경우 - 성공", async () => {
            const storeId = 1;
            const menuList = [
                { id: 1, foodName: "마라샹궈" },
                { id: 2, foodName: "마라탕" },
            ];
            const result = await orderService.createOrder(storeId, menuList);
            expect(result).toEqual(undefined);
        });
    });
});
