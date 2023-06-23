import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { StoreService } from '../store/store.service';

@Injectable()
export class BookmarkService {
    constructor(private authService: AuthService, private storeService: StoreService) {}

    validateAddFavoriteStore(storeId: number, userId: number) {
        const store = this.findOneStoreId(storeId);
        const user = this.authService.getUser(userId);
        if (store === null) {
            throw new BadRequestException('존재하지 않는 매장입니다.');
        } else if (user.bookmark.includes(storeId)) {
            throw new BadRequestException('이미 즐겨찾기한 매장입니다.');
        } else {
            return true;
        }
    }

    addFavoriteStore(userId: number, storeId: number) {
        const validateResult = this.validateAddFavoriteStore(storeId, userId);
        if (validateResult) {
            this.saveFavoriteStore(userId, storeId);
        }
    }

    getManyFavoriteStores(userId: number) {
        const user = this.authService.getUser(userId);
        return user.bookmark ?? null;
    }

    findOneStoreId(storeId: number) {
        const store = this.storeService.getStore(storeId);
        return store ?? null;
    }

    removeFavoriteStore(userId: number, storeId: number) {
        const user = this.authService.getUser(userId);
        if (user.bookmark.includes(storeId)) {
            const newBookmark = user.bookmark.filter((bookmark) => bookmark !== storeId);
            this.authService.updateUser(userId, { bookmark: newBookmark });
        } else if (user.bookmark.includes(storeId) === false) {
            throw new BadRequestException('즐겨찾기 된 매장이 아닙니다.');
        }
    }

    saveFavoriteStore(userId: number, storeId: number) {
        const user = this.authService.getUser(userId);
        const newBookmark = [...user.bookmark, storeId];
        this.authService.updateUser(userId, { bookmark: newBookmark });
    }
}
