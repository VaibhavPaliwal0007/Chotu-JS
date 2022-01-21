const allowances = {
  basicSalary: 0,
  hra: function hra() {
    return this.basicSalary * 0.5;
  },
  da: function da() {
    return this.basicSalary * 0.2;
  },
  ta: function ta() {
    return this.basicSalary * 0.3;
  },
  ma: function ma() {
    return this.basicSalary * 0.15;
  },
  pf: function pf() {
    return this.basicSalary * 0.05;
  },
  gs: function gs() {
    return this.basicSalary + this.hra() + this.da() + this.ma();
  },
  ns: function ns() {
    return this.gs() - this.pf();
  },
};
