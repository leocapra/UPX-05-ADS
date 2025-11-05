/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useRef } from "react";

// Definimos uma interface para as opções
interface UseQueryOptions {
  enabled?: boolean;
}

export function useQuery<T>(
  queryFn: () => Promise<T>,
  deps: any[] = [],
  // 3º parâmetro: um objeto de opções opcional
  options?: UseQueryOptions
): [T | null, Error | null, () => void, boolean] {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Extraímos a opção `enabled` com um valor padrão de `true`.
  // Se `options` não for fornecido ou se `enabled` não estiver nele, será `true`.
  const { enabled = true } = options || {};

  const queryFnRef = useRef(queryFn);

  useEffect(() => {
    queryFnRef.current = queryFn;
  }, [queryFn]);

  const fetchData = useCallback(async () => {
    // Apenas executa se estiver ativado
    if (!enabled) {
      // Se não estiver ativado, garantimos que não haja estado de 'loading'
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const result = await queryFnRef.current();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [enabled]); // `enabled` agora é uma dependência do callback

  useEffect(() => {
    // A verificação `enabled` agora controla a execução da busca.
    // Se a query for desativada, limpamos os dados para evitar mostrar informação antiga.
    if (enabled) {
      fetchData();
    } else {
      setData(null);
      setError(null);
      setIsLoading(false);
    }
  }, [fetchData, enabled, ...deps]); // Adicionamos `enabled` às dependências do efeito

  return [data, error, fetchData, isLoading];
}