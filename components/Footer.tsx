export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="container-content py-12 grid md:grid-cols-3 gap-8 text-sm font-body">
        <div>
          <div className="font-display text-white text-2xl mb-2">
            BOISE MARKETING GUY
          </div>
          <p>Helping small businesses grow.</p>
        </div>
        <div>
          <div className="text-white font-bold mb-2">Reach me</div>
          <div>Dwight: (208) 761-7016</div>
          <div>Maya: (208) 957-5828</div>
          <div>dwight@boisemarketingguy.com</div>
        </div>
        <div>
          <div className="text-white font-bold mb-2">Find us</div>
          <div>Boise, Idaho</div>
        </div>
      </div>
      <div className="container-content border-t border-white/10 py-6 text-xs font-body text-white/40">
        © {new Date().getFullYear()} Boise Marketing Guy. All rights reserved.
      </div>
    </footer>
  );
}
