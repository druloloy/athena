'use client';

import React, { ComponentType } from 'react';
import { Button } from '../atoms/button';
import { LucideRotateCw } from 'lucide-react';
import { BookProps } from '../Book';
import { BorrowedBookProps } from '../BorrowedBook';
import { v4 as genUUID } from 'uuid';

interface BaseItemProps extends BookProps, BorrowedBookProps {
  id: string;
  key: string;
  title: string;
  created_at: Date;
}

interface ItemComponentProps<T extends Partial<BaseItemProps>> {
  item: T;
  ctaFunction: () => void;
  ctaFunction2: () => void;
  key?: string;
}
export default function Collection<T extends Partial<BaseItemProps>>({
  dataset,
  ItemComponent,
  showEmptyMessage = true,
  includeRefresh = false,
  onRefresh,
  refreshTimeout = 1500,
  onCTAClick,
  onCTAClick2,
}: {
  dataset: T[];
  ItemComponent: ComponentType<ItemComponentProps<T>>;
  includeRefresh?: boolean;
  showEmptyMessage?: boolean;
  onRefresh?: () => void;
  refreshTimeout?: number;
  onCTAClick?: (item: T) => void;
  onCTAClick2?: (item: T) => void;
}) {
  const [isRefreshingCollection, setIsRefreshingCollection] = React.useState(false);

  const handleCTAClick = (item: T) => {
    if (onCTAClick) {
      onCTAClick(item);
    }
  };

  const handleCTAClick2 = (item: T) => {
    if (onCTAClick2) {
      onCTAClick2(item);
    }
  };

  const refresh = React.useCallback(() => {
    setIsRefreshingCollection(true);
    setTimeout(() => {
      setIsRefreshingCollection(false);
      if (onRefresh) {
        onRefresh();
      }
    }, refreshTimeout);
  }, [onRefresh, refreshTimeout]);

  return (
    <div>
      {includeRefresh && (
        <div className="px-4 mt-4">
          <Button onClick={refresh} variant="ghost" className="mt-4">
            {isRefreshingCollection ? (
              <>
                <LucideRotateCw className="animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <LucideRotateCw />
                Refresh
              </>
            )}
          </Button>
        </div>
      )}

      <div className="gap-4 flex flex-wrap">
        {dataset.length > 0 ? (
          dataset.map((item) => (
            <ItemComponent
              key={item.id || genUUID()}
              item={item}
              ctaFunction={() => handleCTAClick(item)}
              ctaFunction2={() => handleCTAClick2(item)}
            />
          ))
        ) : showEmptyMessage ? (
          <div>
            <h2 className="text-center text-2xl">No books found.</h2>
          </div>
        ) : null}
      </div>
    </div>
  );
}
