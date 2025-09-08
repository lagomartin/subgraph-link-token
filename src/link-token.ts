import { Transfer as TransferEvent } from "../generated/LinkToken/LinkToken";
import { Account, Transfer } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleTransfer(event: TransferEvent): void {
  // --- 1. Crear o Cargar la Cuenta del Emisor (from) ---
  let fromAddress = event.params.from;
  let fromAccount = Account.load(fromAddress);
  if (fromAccount == null) {
    fromAccount = new Account(fromAddress);
    fromAccount.balance = BigInt.fromI32(0);
  }
  // Restamos el valor de la transferencia de su balance
  fromAccount.balance = fromAccount.balance.minus(event.params.value);
  fromAccount.save();

  // --- 2. Crear o Cargar la Cuenta del Receptor (to) ---
  let toAddress = event.params.to;
  let toAccount = Account.load(toAddress);
  if (toAccount == null) {
    toAccount = new Account(toAddress);
    toAccount.balance = BigInt.fromI32(0);
  }
  // Sumamos el valor de la transferencia a su balance
  toAccount.balance = toAccount.balance.plus(event.params.value);
  toAccount.save();

  // --- 3. Crear y Guardar la Entidad Transfer ---
  let transfer = new Transfer(event.transaction.hash);
  transfer.from = fromAccount.id;
  transfer.to = event.params.to;
  transfer.value = event.params.value;
  transfer.timestamp = event.block.timestamp;
  transfer.blockNumber = event.block.number;
  transfer.save();
}