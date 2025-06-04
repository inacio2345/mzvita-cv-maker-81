
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PenTool, Bot } from 'lucide-react';
import { CartaPersonalizada } from '@/components/carta/CartaPersonalizada';
import { CartaAutomatica } from '@/components/carta/CartaAutomatica';

const CartaApresentacao = () => {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Gerador de Carta de Apresentação
        </h1>
        <p className="text-lg text-gray-600">
          Crie uma carta de apresentação profissional de forma personalizada ou automática
        </p>
      </div>

      <Tabs defaultValue="personalizada" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="personalizada" className="flex items-center gap-2">
            <PenTool className="w-4 h-4" />
            Carta Personalizada
          </TabsTrigger>
          <TabsTrigger value="automatica" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Carta Automática
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personalizada">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="w-5 h-5" />
                Modo Personalizado
              </CardTitle>
              <p className="text-gray-600">
                Escreva sua própria carta de apresentação com total controle sobre o conteúdo
              </p>
            </CardHeader>
            <CardContent>
              <CartaPersonalizada />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automatica">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Modo Automático
              </CardTitle>
              <p className="text-gray-600">
                Responda algumas perguntas e nossa IA gerará uma carta profissional para você
              </p>
            </CardHeader>
            <CardContent>
              <CartaAutomatica />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CartaApresentacao;
