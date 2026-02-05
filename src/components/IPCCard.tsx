'use client';

import { IPCData, IPCStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck } from 'lucide-react';

interface IPCCardProps {
  ipcData: IPCData;
}

function getStatusBadge(status: IPCStatus | null) {
  if (!status) {
    return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Unknown</Badge>;
  }

  switch (status) {
    case 'released':
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          Released
        </Badge>
      );
    case 'in process':
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          In Process
        </Badge>
      );
    case 'submitted':
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
          Submitted
        </Badge>
      );
    case 'not submitted':
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          Not Submitted
        </Badge>
      );
    default:
      return <Badge className="bg-gray-100 text-gray-700">Unknown</Badge>;
  }
}

export default function IPCCard({ ipcData }: IPCCardProps) {
  console.log('[IPCCard] Received ipcData:', ipcData);
  console.log('[IPCCard] Records count:', ipcData?.records?.length ?? 0);
  
  if (!ipcData.records || ipcData.records.length === 0) {
    console.log('[IPCCard] No records to display, returning null');
    return null;
  }

  const summary = {
    released: ipcData.records.filter(i => i.status === 'released').length,
    inProcess: ipcData.records.filter(i => i.status === 'in process').length,
    submitted: ipcData.records.filter(i => i.status === 'submitted').length,
    notSubmitted: ipcData.records.filter(i => i.status === 'not submitted').length,
  };

  return (
    <div className="mb-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="w-5 h-5 text-red-600" />
              Interim Payment Certificates (IPC)
            </CardTitle>

            {/* Summary badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {summary.released > 0 && (
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  {summary.released} Released
                </Badge>
              )}
              {summary.inProcess > 0 && (
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  {summary.inProcess} In Process
                </Badge>
              )}
              {summary.submitted > 0 && (
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                  {summary.submitted} Submitted
                </Badge>
              )}
              {summary.notSubmitted > 0 && (
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                  {summary.notSubmitted} Not Submitted
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {ipcData.records.map((ipc) => (
              <div
                key={ipc.ipcNumber}
                className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow"
              >
                <div className="font-bold text-gray-900 mb-2">{ipc.ipcNumber}</div>
                {getStatusBadge(ipc.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
