class MeuJogo extends JS_CG_2D_API {
    acaoAoIniciar() {
        this.teclas = { esquerda: false, direita: false };
        this.plataformas = [
            { x: 0, y: 500, largura: 800, altura: 100 },
            new Retangulo2D(300, 400, 200, 30)
        ];
        this.jogador = new Personagem(100, 300, 40, 60, this.plataformas);
    }

    teclaPressionada(e) {
        if (e.code === "ArrowLeft") this.teclas.esquerda = true;
        if (e.code === "ArrowRight") this.teclas.direita = true;
    }

    teclaLiberada(e) {
        if (e.code === "ArrowLeft") this.teclas.esquerda = false;
        if (e.code === "ArrowRight") this.teclas.direita = false;
    }

    atualizar() {
        const direcao = (this.teclas.direita ? 1 : 0) - (this.teclas.esquerda ? 1 : 0);
        this.jogador.setX(this.jogador.getX() + direcao * 4);
        this.jogador.atualizar();
    }

    desenhar() {
        this.limparTela("skyblue");
        this.preenchimento("green");
        for (const plataforma of this.plataformas) {
            this.retangulo(
                plataforma.x,
                plataforma.y,
                plataforma.largura,
                plataforma.altura,
                Estilo.PREENCHIDO
            );
        }
        this.preenchimento("red");
        this.retangulo(this.jogador.getX(), this.jogador.getY(), 40, 60, Estilo.PREENCHIDO);
    }
}

window.addEventListener("load", () => {
    new MeuJogo("Meu Primeiro Jogo com Plataforma", "meuCanvas", 800, 600);
});