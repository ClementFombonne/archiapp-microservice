{
  pkgs ? import <nixpkgs> { },
}:

pkgs.mkShell {
  buildInputs = [
    pkgs.python3
  ];

  shellHook = ''
    echo "=========================================================="
    echo "🚀 Environnement Nix prêt pour ton application !"
    echo "=========================================================="
    echo "Pour lancer le serveur de test local, tape la commande :"
    echo "  python3 -m http.server 8000"
    echo ""
    echo "Ouvre ensuite ton navigateur et va sur : http://localhost:8000"
    echo "=========================================================="
  '';
}
