import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { api } from "../services/api";
import { stylesFinancialSummary } from "./styleFinancialSummary";

export function FinancialSummary() {
    const [totalEntrada, setTotalEntrada] = useState(0);
    const [totalSaida, setTotalSaida] = useState(0);
    const [saldoTotal, setSaldoTotal] = useState(0);

    useEffect(() => {
        fetchFinancialData();
    }, []);

    const fetchFinancialData = async () => {
        try {
            const response = await api.get("/registros-financeiros");
            const data = response.data;

            const entrada = data
                .filter((item: any) => item.tipoRegistro === 0)
                .reduce((acc: number, curr: any) => acc + curr.valor, 0);

            const saida = data
                .filter((item: any) => item.tipoRegistro === 1)
                .reduce((acc: number, curr: any) => acc + curr.valor, 0);

            setTotalEntrada(entrada);
            setTotalSaida(saida);
            setSaldoTotal(entrada - saida);
        } catch (error: any) {
            Alert.alert(
                "Erro ao carregar dados financeiros",
                error.response?.data?.message || error.message || "Não foi possível carregar os dados financeiros."
            );
        }
    };

    return (
        <View style={stylesFinancialSummary.container}>
            <Text style={stylesFinancialSummary.title}>Resumo Financeiro</Text>
            <View style={stylesFinancialSummary.summaryCard}>
                <Text style={stylesFinancialSummary.label}>Total de Entrada:</Text>
                <Text style={stylesFinancialSummary.valueEntrada}>R$ {totalEntrada.toFixed(2)}</Text>
            </View>
            <View style={stylesFinancialSummary.summaryCard}>
                <Text style={stylesFinancialSummary.label}>Total de Saída:</Text>
                <Text style={stylesFinancialSummary.valueSaida}>R$ {totalSaida.toFixed(2)}</Text>
            </View>
            <View style={stylesFinancialSummary.summaryCard}>
                <Text style={stylesFinancialSummary.label}>Saldo Total:</Text>
                <Text style={stylesFinancialSummary.valueSaldo}>R$ {saldoTotal.toFixed(2)}</Text>
            </View>
        </View>
    );
}
