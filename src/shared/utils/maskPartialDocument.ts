import { cnpj, cpf } from 'cpf-cnpj-validator';

export function maskPartialDocument(document: string): string {
  const cleanDoc = document.replace(/[^0-9]/g, '');
  if (cpf.isValid(cleanDoc)) return `***.${cleanDoc.slice(3, 6)}.***-**`;
  if (cnpj.isValid(cleanDoc)) return `**.${cleanDoc.slice(2, 5)}.***/****-**`;
  throw new Error('Documento inválido. Insira um CPF ou CNPJ válido.');
}