export = isReadyTcp;
declare function isReadyTcp(port: number, host?: string, timeOutSeconds?: number, intervalAttemptsSeconds?: number): Promise<void>;
