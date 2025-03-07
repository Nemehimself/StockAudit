'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useValidatCustomerRedeemNumber } from '@/services/hooks/reward/hook';
import { errorType } from '@/services/hooks/auth/hook';
import QRCodeScanner from '@/app/dashboard/Content/Dashboard/QRCodeScanner';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from '@/components/ui/select';

const ScanQRModal = () => {
  const [customerNumber, setCustomerNumber] = useState('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rewardId, setRewardId] = useState<string>('');

  const { reward } = useSelector((state: RootState) => state.campaing);

  const { mutate, isPending, isSuccess, isError, error } =
    useValidatCustomerRedeemNumber();

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
    if (isError) {
      const errorData = error as unknown as errorType;
      const errorMsg = errorData.response.data.error;
      setErrMsg(errorMsg);
    }
  }, [isSuccess, isError, error]);

  const handleRewardValueChange = (value: string) => {
    setRewardId(value);
  };

  const handleSubmit = () => {
    if (!customerNumber || customerNumber.length < 11) {
      setErrMsg('Please scan the QR code');
    } else mutate({ customerNumber });
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogTrigger asChild>
          <Button variant="outline">Redeem rewards</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Credit a customer with number
            </DialogTitle>
            <DialogDescription className="text-lg">
              Enter the amount of points and a customer number to credit the
              customer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select value={rewardId} onValueChange={handleRewardValueChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select reward" />
              </SelectTrigger>
              <SelectContent>
                {reward && (
                  <SelectItem value={reward.id ?? ''}>
                    {reward.title}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {!customerNumber ? (
              <QRCodeScanner
                setScannedResult={result => setCustomerNumber(result || '')}
              />
            ) : (
              <p className="text-2xl font-medium text-center">
                {customerNumber}
              </p>
            )}
          </div>

          {errMsg && <p className="text-lg text-red-500">{errMsg}</p>}
          <DialogFooter>
            {customerNumber && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCustomerNumber('');
                }}
                disabled={isPending}
              >
                Scan again
              </Button>
            )}
            <Button type="button" onClick={handleSubmit} disabled={isPending}>
              {isPending ? 'Redeeming...' : 'Redeem reward'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScanQRModal;
