# Troubleshooting - Railway 502 Error

## Problema
A aplicação retorna `502 Bad Gateway` consistentemente, apesar do código funcionar perfeitamente localmente.

## Diagnóstico na Railway

### 1. Verificar Logs do Deployment
```
Dashboard Railway → aula-production-c563 → Deployments
```
Procura por:
- Erros durante o build (`npm install && npm run build`)
- Erros ao iniciar o servidor
- Mensagens de crashing ou timeout

### 2. Verificar Logs HTTP
```
Dashboard Railway → aula-production-c563 → Logs → HTTP Logs
```
Procura por:
- Status codes anormais
- Timeouts
- Padrões de erros

### 3. Verificar Variáveis de Ambiente
```
Dashboard Railway → aula-production-c563 → Variables
```
Confirma:
- `PORT` está sendo definida (normalmente Railway faz isto automaticamente)
- Nenhuma variável essencial está faltando

### 4. Verificar Health da Aplicação
```
Dashboard Railway → aula-production-c563 → Details
```
Procura:
- Status: "Running" (não "Crashed" ou "Failed")
- Memory/CPU usage

## Ações de Troubleshooting

### Opção 1: Recria o Serviço
Se tudo mais falhar:
1. Remove o serviço atual do Railway
2. Cria um novo serviço
3. Religa o repositório GitHub

### Opção 2: Tenta com Dockerfile
Se o problema persistir:
```dockerfile
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=8080

CMD ["npm", "start"]
```

### Opção 3: Verifica Node Version
- Railway pode estar usando uma versão de Node que não suporta ES modules
- Edita `package.json` e tira `"type": "module"` se necessário
- Ou garante que Node 18+ está configurado

## Testes Locais para Verificar
```bash
# 1. Build
npm run build

# 2. Test production server
PORT=8080 npm start

# 3. Em outro terminal, testa
curl http://localhost:8080/

# Deve responder com HTML do dashboard
```

## Checklist

- [ ] Logs de deployment mostram build bem-sucedido
- [ ] Serviço está em estado "Running"
- [ ] PORT environment variable está definida
- [ ] Servidor Express responde em localhost
- [ ] `dist/` folder existe após build
- [ ] `dist/index.html` existe

## Contacto/Escalação
Se os logs mostram algo específico, compartilha a mensagem de erro - isso vai ajudar muito a diagnosticar.
