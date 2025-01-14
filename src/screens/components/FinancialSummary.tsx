import React, { useState, useEffect } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import { api } from "../services/api";
import { stylesFinancialSummary } from "./styleFinancialSummary";
import { PieChart } from "react-native-chart-kit";

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

    const total = totalEntrada + totalSaida;

    const pieChartData = [
        {
            name: "Entrada",
            total: totalEntrada,
            color: "#28A745",
            legendFontColor: "#333",
            legendFontSize: 14,
            percent: total > 0 ? ((totalEntrada / total) * 100).toFixed(2) : "0.00",
        },
        {
            name: "Saída",
            total: totalSaida,
            color: "#DC3545",
            legendFontColor: "#333",
            legendFontSize: 14,
            percent: total > 0 ? ((totalSaida / total) * 100).toFixed(2) : "0.00",
        },
    ];

    const formatCurrency = (value: number) => {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        });
    };

    return (
        <View style={stylesFinancialSummary.container}>
            <Text style={stylesFinancialSummary.title}>Resumo Financeiro</Text>
            <View style={stylesFinancialSummary.summaryCard}>
                <Text style={stylesFinancialSummary.label}>Total de Entrada:</Text>
                <Text style={stylesFinancialSummary.valueEntrada}>{formatCurrency(totalEntrada)}</Text>
            </View>
            <View style={stylesFinancialSummary.summaryCard}>
                <Text style={stylesFinancialSummary.label}>Total de Saída:</Text>
                <Text style={stylesFinancialSummary.valueSaida}>{formatCurrency(totalSaida)}</Text>
            </View>
            <View style={stylesFinancialSummary.summaryCard}>
                <Text style={stylesFinancialSummary.label}>Saldo Total:</Text>
                <Text style={stylesFinancialSummary.valueSaldo}>{formatCurrency(saldoTotal)}</Text>
            </View>

            {/* Gráfico de Pizza */}
            <Text style={stylesFinancialSummary.title}>Comparação de Totais</Text>
            <PieChart
                data={pieChartData.map((item) => ({
                    name: item.name,
                    total: item.total,
                    color: item.color,
                    legendFontColor: item.legendFontColor,
                    legendFontSize: item.legendFontSize,
                    label: `${item.percent}%`, // Percentual como label
                }))}
                width={Dimensions.get("window").width - 40} // Ajusta ao tamanho da tela
                height={220}
                chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor={"total"}
                backgroundColor={"transparent"}
                paddingLeft={"10"}
                absolute={false} // Exibe percentuais dentro do gráfico
            />
        </View>
    );
}
