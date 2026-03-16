{
  pkgs ? import <nixpkgs> { },
}:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs
  ];

  shellHook = ''
    echo "=========================================================="
    echo "🚀 Nix environment ready for your Fullstack App!"
    echo "=========================================================="
    echo "To get started, run these commands in your terminal:"
    echo ""
    echo "  1. Install Express (if you haven't already):"
    echo "     npm install express"
    echo ""
    echo "  2. Start your Node.js server:"
    echo "     node index.js"
    echo ""
    echo "Then open your browser and go to: http://localhost:8080"
    echo "=========================================================="
  '';
}
